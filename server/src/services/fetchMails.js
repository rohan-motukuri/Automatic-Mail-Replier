const { google } = require('googleapis');
const { authorize } = require('../auth/authorize');

async function fetchMails(afterDate = "1900/01/01", q = "") {
    try {
        const auth = await authorize();
        const gmail = google.gmail({ version: 'v1', auth });
        const query = `after:${afterDate} ${q}`;
    
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: query,
        });
    
        const messages = response.data.messages || [];
        
        const mails = await Promise.all(messages.map(async (message) => {
            const mail = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });
    
            return mail.data;
        }));
    
        return mails;
    } catch (e) {
        console.error('Error fetching mails: ', error.message);
        throw e;
    }
}

module.exports = {
    fetchMails,
};
