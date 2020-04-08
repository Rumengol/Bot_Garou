const identifiers = require("../../identifiers.json");
const dbUtils = require("../../Utils/dbUtils.js");

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
      var obj = {
        guild: message.guild.id,
        id: args[1],
        story_value: args[0]
      };
      dbUtils.removeFromDb("db", "roles", obj);
      message.channel.send("<@&" + args[0] + "> supprimé des rôles.");
    }
  }
};
