const identifiers = require("../../identifiers.json");
const dbUtils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "suppsalon",
  description: "Supprime un salon avec l'identifiant spécifié",
  args: true,
  usage: "[ID Salon] [identifiant]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    if (identifiers.salons.split(",").includes(args[1])) {
      var obj = {
        guild: message.guild.id,
        id: args[1],
        story_value: args[0]
      };
      dbUtils.removeFromDb("db", "salons", obj);
      message.channel.send("<#" + args[0] + "> supprimé des salons.");
    }
  }
};
