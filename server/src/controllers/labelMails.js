const { changeLabels } = require("../services/changeLabel");
const { createLabel } = require("../services/createLabel");
const { listLabels } = require("../services/listLabels");


async function labelMails (mails = []) {
    const replyedMailsLabel = 'Auto-Replied';

    let labelID = null;
    const listOfLabels = await listLabels();

    if(!listOfLabels.some(label => label.name === replyedMailsLabel)) {
        labelID = await createLabel(replyedMailsLabel);
    }

    if(!labelID) {
        labelID = listOfLabels.find(label => label.name === replyedMailsLabel).id;
    }

    await Promise.all(mails.map(async mail => {

        await changeLabels(mail.threadId, labelID);
    }));
}

module.exports = {
    labelMails,
}