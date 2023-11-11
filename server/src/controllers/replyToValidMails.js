const { gmailReply } = require("../services/gmailReply")


async function replyToValidMails (replies) {
    const repliedReplies = await Promise.all(replies.map(async reply => {
        const success = await gmailReply(reply);

        return {
            reply,
            success
        }
    }));

    const successfulReplies = repliedReplies.filter(reply => reply.success).map(reply => reply.reply);
    const failedReplies = repliedReplies.filter(reply => !reply.success).map(reply => reply.reply);

    return {
        successfulReplies,
        failedReplies
    }
}

module.exports = {
    replyToValidMails,
}