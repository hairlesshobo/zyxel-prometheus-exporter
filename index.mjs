// zyxel_prometheus_exporter - index.js
import express from 'express';
import { chromium } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config("./.env");

const SWITCH_IP = process.env.SWITCH_IP || '192.168.1.3';
const SWITCH_PASSWORD = process.env.SWITCH_PASSWORD;


if (!SWITCH_PASSWORD) {
  console.error("❌ Missing required config-value SWITCH_PASSWORD.");
  process.exit(1);
}

const SWITCH_URL = `http://${SWITCH_IP}`;
const SCRAPE_INTERVAL_MS = 15000;

let browser, page;
let lastMetrics = '# No data yet\n';

async function main() {
  await scrapeSwitch();
  setInterval(scrapeSwitch, SCRAPE_INTERVAL_MS);

  const app = express();
  app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(lastMetrics);
  });

  app.listen(3000, () => console.log('Prometheus exporter on :3000/metrics'));
}

// Background scraper
async function scrapeSwitch() {
  try {
    if (!page) {
      browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      page = await context.newPage();

      // Login
      await page.goto(SWITCH_URL);
      await page.fill('#password', SWITCH_PASSWORD); // update selector
      await page.click('#btnLogin'); // update selector
    } else {
      page.reload();
    }

    // network content is in iframe inside main page
    await page.waitForSelector('iframe#fr');

    // Get the frame object
    const frameHandle = await page.$('iframe#fr');
    const frame = await frameHandle.contentFrame();

    // Wait for the list of network ports
    // await frame.waitForSelector('.b_content_inner ul');
    await frame.waitForSelector('.b_content_inner');

    const extracted = await frame.$$eval('.b_content_inner ul', elements => {
      return elements.map(el => {
        // Example: get port name and byte count from sibling/child elements
        const port = el.querySelector('li:first-child')?.textContent.trim();
        const tx = el.querySelector('.tx_pkts')?.textContent .trim().replace(/,/g, '');
        const rx = el.querySelector('.rx_pkts')?.textContent .trim().replace(/,/g, '');
        return { port, rx: Number(rx), tx: Number(tx) };
      });
    });

    // TODO: packets
    // node_network_receive_packets_total{device="br0"} 1.5740371e+07
    // node_network_transmit_packets_total{device="br0"} 3.583849e+06

    let result = `# Last updated: ${new Date()}\n`;
    for (const row of extracted) {
      const portName = `eth${row.port}`;
      result += `node_network_receive_packets_total{device="${portName}"} ${row.rx}\n`;
    }
    for (const row of extracted) {
      const portName = `eth${row.port}`;
      result += `node_network_transmit_packets_total{device="${portName}"} ${row.tx}\n`;
    }

    lastMetrics = result;
  } catch (err) {
    console.error('Scrape failed:', err);
    // retry from scratch next time
    await page.close();
  }
}

main();
