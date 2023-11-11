const { google } = require("googleapis");
const { authorize } = require("../auth/authorize");


async function changeLabels (threadId, labelID) {

    const auth = await authorize();
    const gmail = google.gmail({version : "v1", auth});
    

    gmail.users.threads.modify({
        userId: 'me',
        id: threadId,
        requestBody: {
            addLabelIds: [labelID]
        },
    });
}

module.exports = {
    changeLabels,
}