const { authenticate } = require('@google-cloud/local-auth');
const { loadToken, saveToken } = require('./token');
const { google } = require('googleapis');
const { CREDENTIALS_PATH } = require('./credentials');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
];

async function loadSavedCredentialsIfExist() {
    try {
        const credentials = await loadToken();
        return google.auth.fromJSON(credentials);
      } catch (err) {
        return null;
      }
}

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveToken(client);
    }
    return client;
}

module.exports = {
    authorize,
}