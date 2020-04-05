const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const identifiers = require("../../identifiers.json");

module.exports = {
  name: "supprole",
  description: "Supprime un rôle d'après l'identifiant spécifié",
  args: true,
  usage: "[ID role] [identifiant]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    if (identifiers.roles.split(",").includes(args[1])) {
      db.get("roles")
        .remove({
          guild: message.guild.id,
          id: args[1],
          story_value: args[0]
        })
        .write();
      message.channel.send("<@&" + args[0] + "> supprimé des rôles.");
    }
  }
};
