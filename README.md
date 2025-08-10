
# zyxel-prometheus-exporter

Export packet-statistics from your managed Zyxel switch, and integrate
into your Prometheus stack!

## Requirements

To use and run zyxel-prometheus-exporter, besides a managed Zyxel
Switch, the following software is required:

- NodeJS
- npm

## Initial Setup

```sh
git clone https://github.com/josteink/zyxel-prometheus-exporter
cd zyxel-prometheus-exporter
npm ci
npx playwright install
SWITCH_IP=192.168.1.3 SWITCH_PASSWORD=yourpass node index.mjs
```

## Example output

```
# curl http://localhost:3000/metrics
node_network_receive_packets_total{device="eth1"} 919283443
node_network_transmit_packets_total{device="eth1"} 1142682602
node_network_receive_packets_total{device="eth2"} 36465308
node_network_transmit_packets_total{device="eth2"} 119648795
node_network_receive_packets_total{device="eth3"} 0
node_network_transmit_packets_total{device="eth3"} 0
node_network_receive_packets_total{device="eth4"} 0
node_network_transmit_packets_total{device="eth4"} 0
node_network_receive_packets_total{device="eth5"} 1119223
node_network_transmit_packets_total{device="eth5"} 117963207
node_network_receive_packets_total{device="eth6"} 730643
node_network_transmit_packets_total{device="eth6"} 1659038
node_network_receive_packets_total{device="eth7"} 0
node_network_transmit_packets_total{device="eth7"} 0
node_network_receive_packets_total{device="eth8"} 32922264
node_network_transmit_packets_total{device="eth8"} 232463860
node_network_receive_packets_total{device="eth9"} 4581140470
node_network_transmit_packets_total{device="eth9"} 3068783382
node_network_receive_packets_total{device="eth10"} 165994503
node_network_transmit_packets_total{device="eth10"} 478667891
node_network_receive_packets_total{device="eth11"} 0
node_network_transmit_packets_total{device="eth11"} 0
node_network_receive_packets_total{device="eth12"} 6935260617
node_network_transmit_packets_total{device="eth12"} 3608296228
```
