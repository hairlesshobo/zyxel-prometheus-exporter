
# zyxel-prometheus-exporter

Export packet-statistics from your managed Zyxel switch, and integrate
into your Prometheus stack!

## Requirements

To use and run zyxel-prometheus-exporter, besides a managed Zyxel
Switch, the following software is required:

- NodeJS
- npm

**NOTE:** This module is designed to work on Zyxel switches without
SNMP support. It may work on those swicthes too, but that has not been
tested and can not be guaranteed.

## Supported units

Tested on a Zyxel XGS1210-12 switch with firmware-version `V2.00(ABTY.1)C0`.
I'm assuming it works equally well on other Zyxel switches using similar
firmware (like the XGS1250-12).

## Initial Setup

```sh
# get code
git clone https://github.com/josteink/zyxel-prometheus-exporter
cd zyxel-prometheus-exporter

# get deps
npm ci
npm run deps

# configure switch IP and passwd
npm run configure

# start prometheus exporter
npm run start
```

## Example output

```
# curl http://localhost:3000/metrics
# Last updated: Mon Aug 11 2025 07:46:42 GMT+0200 (Central European Summer Time)
node_network_receive_packets_total{device="eth1"} 919283443
node_network_receive_packets_total{device="eth2"} 36550621
node_network_receive_packets_total{device="eth3"} 0
node_network_receive_packets_total{device="eth4"} 0
node_network_receive_packets_total{device="eth5"} 1121100
node_network_receive_packets_total{device="eth6"} 753238
node_network_receive_packets_total{device="eth7"} 0
node_network_receive_packets_total{device="eth8"} 32957384
node_network_receive_packets_total{device="eth9"} 4601940601
node_network_receive_packets_total{device="eth10"} 166184974
node_network_receive_packets_total{device="eth11"} 0
node_network_receive_packets_total{device="eth12"} 6951510378
node_network_transmit_packets_total{device="eth1"} 1142682602
node_network_transmit_packets_total{device="eth2"} 119888621
node_network_transmit_packets_total{device="eth3"} 0
node_network_transmit_packets_total{device="eth4"} 0
node_network_transmit_packets_total{device="eth5"} 118214487
node_network_transmit_packets_total{device="eth6"} 1977292
node_network_transmit_packets_total{device="eth7"} 0
node_network_transmit_packets_total{device="eth8"} 232761566
node_network_transmit_packets_total{device="eth9"} 3084774764
node_network_transmit_packets_total{device="eth10"} 479072763
node_network_transmit_packets_total{device="eth11"} 0
node_network_transmit_packets_total{device="eth12"} 3629338981
```

## systemd-support

Adapt the supplied systemd service template-file, copy it in the
right place and you're good to go.

```sh
nano zyxel-prometheus-exporter.service
sudo cp zyxel-prometheus-exporter.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now zyxel-prometheus-exporter.service
```

## Running with Docker

```sh
docker build -t zyxel-prometheus-exporter .
docker run --rm \
    --name zyxel-prometheus-exporter \
    -p 3000:3000 \
    -e SWITCH_IP=192.168.1.10 \
    -e 'SWITCH_PASSWORD=superSecretPassword1' \
    zyxel-prometheus-exporter
```
