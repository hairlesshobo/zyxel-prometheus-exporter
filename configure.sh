#!/bin/bash
# save_env.sh

# Prompt user for values (or you can pass them in as arguments)
read -p "Enter Switch IP: " SWITCH_IP
read -sp "Enter Switch Password: " SWITCH_PASSWORD
echo

# Write to .env
cat > .env <<EOF
SWITCH_IP=$SWITCH_IP
SWITCH_PASSWORD=$SWITCH_PASSWORD
EOF

echo ".env file created with SWITCH_IP and SWITCH_PASSWORD."
