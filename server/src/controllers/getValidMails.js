const { fetchMails } = require('../services/fetchMails');
const interProcessingCache = require('../cache/interProcessingCache');

async function getValidMails (afterDate = "2023/11/11") {
    query = "";
    const latestMails = await fetchMails(afterDate, query);
    const mailsWithoutReplies = await filterMailsWithoutReplies(latestMails);

    const mailsWithoutRepliesProcessable = mailsWithoutReplies.filter(mail => !interProcessingCache.exists(mail.threadId));

    mailsWithoutRepliesProcessable.forEach(mail => {
        interProcessingCache.addToCache(mail.threadId);
    });

    return mailsWithoutRepliesProcessable;
}

function filterMailsWithoutReplies(mails) {
    let threadMap = {};

    mails.forEach(mail => {
        const threadId = mail.threadId;

        threadMap[threadId] ??= {
            hasSentLabel: false,
            mails: [],
        };

        if (mail.labelIds.includes('SENT')) {
            threadMap[threadId].hasSentLabel = true;
        }

        threadMap[threadId].mails.push(mail);
    });

    const mailsWithoutReplies = mails.filter(mail => !threadMap[mail.threadId].hasSentLabel);

    return mailsWithoutReplies;
}

module.exports = {
    getValidMails,
}