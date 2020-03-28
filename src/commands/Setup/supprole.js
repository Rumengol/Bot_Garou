const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const identifiers = require("../../identifiers.json");

exports.run = (client, message, args) => {
  if (args[2] != null) {
    if (identifiers.roles.split(",").includes(args[2])) {
      db.get("roles")
        .remove({
          guild: message.guild.id,
          id: args[2],
          story_value: args[1]
        })
        .write();
      message.channel.send("<@&" + args[1] + "> supprimé des rôles.");
    } else {
      message.reply(
        "identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid"
      );
    }
  }
};
