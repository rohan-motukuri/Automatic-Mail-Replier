## My submission for backend assessment by Open In App on 11-11-2023

Demonstration: [link](https://drive.google.com/drive/folders/1E1Qd5uFQaPqWWWM-JyQpNftevozJblWw?usp=sharing)

### Project Structure
- I've separated the functionality primarily into Controllers | Services. Controllers refers to an abstracted higher level code which performs large steps of the process. Services are the abstractions to the underlying Gmail API requests, done so that any future rebasing to different services or different API versions is made easy.
- I've also separated the cred, tokens and authentication into their own folders for future additions.
- I've also implemented a cache which is basically a map to keep tracking of the mails that are being processed by any other instance of the entire function which might have been delayed and overlapped with another due to the asynchronous feature.

### Improvements
- A simple client to better control the on off operation of the service.
- Ability to handle multiple users.
- Better and robust process schedulers like Bull.

### Additional Points
- In this demo I've actually added a safeguard time limit for the valid mails step, This is just so that only mails after a certain time are considered for auto replying, done so I don't accidentally spam anyone in my inbox, However this code should function as specified and reply to any and every mail in inbox without prior mails upon passing `undefined` to the first `getValidGet()` call in the main file. I've corrected this and uploaded it to the repo.
- The project does indeed filter out the threads with any prior replies at any point in the conversation. I haven't showcased this functionality in the demonstration due to time constraints.

### References
- [Google GMail API Documentation](https://developers.google.com/gmail/api/reference/rest)
- [Chaining Replies using Gmail API](https://stackoverflow.com/questions/34208082/gmail-api-messages-not-threaded-in-sent)
- [Standard Formatting of email response](https://datatracker.ietf.org/doc/html/rfc2822#appendix-A.2)
