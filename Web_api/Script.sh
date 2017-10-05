sudo apt-get update
sudo apt-get install --assume-yes python-software-properties
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
cd DoorApp
sudo npm install -g
sudo npm install pm2 -g
npm start