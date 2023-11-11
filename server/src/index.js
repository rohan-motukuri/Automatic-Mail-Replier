const { authorize } = require('./auth/authorize');

/** 
 * Controllers 
 * 
 * These modulate the steps of the entire process.
 */
const { getValidMails } = require('./controllers/getValidMails')
const { replyToValidMails } = require('./controllers/replyToValidMails');
const { constructReplies } = require('./controllers/constructReplies')
const { labelMails } = require('./controllers/labelMails');

async function runApplication() {
  try {
    // 1. Authorize
    const auth = await authorize();

    // 2. Get Valid Mails
    const validMails = await getValidMails();

    // 3. Construct Replies
    const constructedReplies = await constructReplies(validMails);

    // 4. Reply
    const repliedMails = await replyToValidMails(constructedReplies);

    // 5. Change Labels
    await labelMails(repliedMails.successfulReplies); 

    if(repliedMails.failedReplies.length > 0) {
      throw new Error("Error creating the following files: " + repliedMails.failedReplies) ;
    }
  } catch (error) {
    console.error('Error running the application: ', error.message);
  }

}

module.exports = {
    runApplication,
}