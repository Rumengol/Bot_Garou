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
    .get("administrateurs")
    .map("id")
    .value().length;
  db.get("administrateurs")
    .push({ id: number, story_value: admin, user: admin.id })
    .write();
  message.channel.send(
    "Enregistré, " + admin + " est désormais administrateur."
  );
};
