const dbutils = require("../../Utils/dbUtils.js");

exports.run = (client, message, args) => {
  if (args == null) {
    message.channel.send("Il faut préciser un utilisateur.");
  }
  noadmin = args[0];
  var obj = { guild: message.guild.id, story_value: noadmin };
  dbutils.removeFromDb("db", "ministrateurs", obj);
  message.reply(noadmin + " supprimé des administrateurs de ce serveur.");
};
