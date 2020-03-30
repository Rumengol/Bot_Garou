const dbutils = require("../../Utils/dbUtils.js");

exports.run = (client, message, args) => {
  if (args == null) {
    message.channel.send("Il faut préciser un utilisateur.");
  }
  noadmin = args[0];
  dbutils.removeFromDb("db", "administrateur", { story_value: noadmin });
  message.reply(noadmin + " supprimé des administrateurs.");
};
