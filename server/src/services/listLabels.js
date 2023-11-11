const { google } = require("googleapis");
const { authorize } = require("../auth/authorize")

async function listLabels () {

  const auth = await authorize();
  const gmail = google.gmail({ version: "v1", auth });

  const list = await gmail.users.labels.list({
    userId:'me'
  });

  return list.data.labels;
}

module.exports = {
  listLabels,
}