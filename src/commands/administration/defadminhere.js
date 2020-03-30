const dbutils = require("../../Utils/dbUtils.js");

exports.run = (client, message, args) => {
  if (args == null) {
    message.channel.send("Il faut préciser un utilisateur.");
  }
  admin = args[0];
  var number = dbutils.getAllValuesInDb("db", "ministrateurs", "id").length;
  var obj = { id: number, story_value: admin, guild: message.guild.id };
  dbutils.writeInDb("db", "ministrateurs", obj);
  message.channel.send(
    "Enregistré, " + admin + " est désormais administrateur sur ce serveur."
  );
};
