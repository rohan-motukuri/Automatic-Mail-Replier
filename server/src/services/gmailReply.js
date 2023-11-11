const { google } = require("googleapis");
const { authorize } = require("../auth/authorize")

async function gmailReply (raw, threadId) {
    const auth = await authorize();
    const gmail = google.gmail({version : 'v1', auth});

    try {
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: Buffer.from(raw.raw).toString('base64'),
                threadId: raw.threadId
            },
            
        });
    } catch (e) {
        console.error("Error while replying: " + e);
        return false;
    }

    return true;
}

module.exports = {
    gmailReply,
}