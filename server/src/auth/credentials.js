const path = require('path');
const process = require('process');

const CREDENTIALS_PATH = path.join(process.cwd(), 'keys/creds.json');

module.exports = {
    CREDENTIALS_PATH
}