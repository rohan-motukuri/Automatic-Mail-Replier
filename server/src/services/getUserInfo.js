const { google } = require("googleapis");
const { authorize } = require("../auth/authorize");

async function getUserInfo() {
    const auth = await authorize();
    const gmail = google.gmail({version : 'v1', auth});

    const user = await gmail.users.getProfile({ userId: 'me' });
    return user.data;
}

module.exports = {
    getUserInfo,
}