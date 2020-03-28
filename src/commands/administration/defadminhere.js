const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);

exports.run = (client, message, args) => {
  if (args == null) {
    message.channel.send("Il faut préciser un utilisateur.");
  }
  admin = args[0];
  var number = db
    .get("ministrateurs")
    .map("id")
    .value().length;
  db.get("ministrateurs")
    .push({ guild: message.guild.id, id: number, story_value: admin })
    .write();
  message.channel.send(
    "Enregistré, " + admin + " est désormais administrateur sur ce serveur."
  );
};
