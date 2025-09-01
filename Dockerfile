FROM node:24.7-trixie

WORKDIR /app

# playwright dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnspr4 \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
  && rm -rf /var/lib/apt/lists/*

COPY . /app 

# get deps
RUN npm ci 
RUN npm run deps

# start prometheus exporter
CMD ["npm", "run", "start"]
