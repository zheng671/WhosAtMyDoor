const accountSid = 'ACc4377ce6f0347af1e515a3db0c2e8250';
const authToken = 'c70c38ff8816b896f1e3306d5e8da956';
const Twilio = require('twilio');

const client = new Twilio(accountSid, authToken);

const service = client.notify.services('IS5c4d9d5ab4caa02c5f578be36fca1742');


module.exports = service;