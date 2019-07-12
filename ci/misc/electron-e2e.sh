##
# Install wine
##
apt update
apt install -y wine

##
# Compile app
##
npm run electron-build-testnet-pipeline

# Test Electron client
apt update && apt install -yq gconf-service libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y libgtk2.0-0 libasound2 xvfb
Xvfb -ac -screen scrn 920x1400x24 :9.0 &
export DISPLAY=:9.0
npm run test:e2e-electron