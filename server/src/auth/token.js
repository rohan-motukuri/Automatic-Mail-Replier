const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const TOKEN_PATH = path.join(process.cwd(), 'keys/token.json');

async function loadToken() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const tokenAsJSON = JSON.parse(content);
    return tokenAsJSON;
  } catch (err) {
    return null;
  }
}

async function saveToken(client) {
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: client._clientId,
    client_secret: client._clientSecret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

module.exports = {
  loadToken,
  saveToken,
};
