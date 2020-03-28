const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);

exports.run = (client, message, args) => {
  if (args == null) {
    message.channel.send("Il faut préciser un utilisateur.");
  }
  noadmin = args[0];
  db.get("administrateurs")
    .remove({ story_value: noadmin })
    .write();
  message.reply(noadmin + " supprimé des administrateurs.");
};
