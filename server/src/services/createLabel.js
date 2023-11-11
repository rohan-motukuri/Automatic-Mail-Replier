const { google } = require("googleapis");
const { authorize } = require("../auth/authorize")

async function createLabel (labelName) {
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });

    const newLabel = await gmail.users.labels.create({
        userId: 'me',
        requestBody: {
          name: labelName,
          labelListVisibility: 'labelShow',
          messageListVisibility: 'show',
        },
    });

    return newLabel.data.id;
}

module.exports = {
    createLabel,
}