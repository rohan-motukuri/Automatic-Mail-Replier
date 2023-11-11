const { getPayloadBreakdown } = require("../services/getPayloadBreakDown");
const { getUserInfo } = require("../services/getUserInfo");

const replyMsgSchema = class {
    constructor (from_reply, to_reply, reply_to, subject, in_reply_to, references, content, prevContent, threadID) {
        this.from = from_reply;
        this.to = to_reply;
        this.in_reply_to = in_reply_to;
        this.subject = subject;
        this.references = references;
        this.content = content;
        this.reply_to = reply_to;
        this.prevContent = prevContent;
        this.threadID = threadID;
    }

    toString () {
        const raw = `From: ${this.from}\r\n` +
        `To: ${this.to}\r\n` +
        `Reply-To: ${this.reply_to}\r\n` + 
        `Subject: ${this.subject}\r\n` + 
        `In-Reply-To: ${this.in_reply_to}\r\n` +
        `References: ${this.references}\r\n` + 
        `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
        `${this.content}`;

        return raw;
    }
};

async function constructReplies (mails, count = 4, units = 'days') {
    const user = await getUserInfo();

    const replyContent = (senderName = "") => `Dear ${senderName},<br><br>Thank you for reaching out. This is an automated response to acknowledge that I have received your email.<br>The user of this account is currently unavailable. You can expect a reply within ${count} ${units}.<br><br>Thank you for your patience.`;

    return mails.map(mail => {
        const payload = getPayloadBreakdown(mail);

        const from_payload = payload.from;
        const to_payload =  payload.to;
        const messageId = payload.messageId;
        const subject = payload.subject;
        const threadId = mail.threadId;

        const senderName = from_payload.split(' ')[0];

        const reply = new replyMsgSchema(to_payload, from_payload, to_payload, subject, messageId, messageId, replyContent(senderName), null, threadId);

        return {
            raw: reply.toString(),
            threadId: threadId
        };
    });
}

module.exports = {
    constructReplies,
}