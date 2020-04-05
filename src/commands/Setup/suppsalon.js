const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const identifiers = require("../../identifiers.json");

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
      db.get("salons")
        .remove({
          guild: message.guild.id,
          id: args[1],
          story_value: args[0]
        })
        .write();
      message.channel.send("<#" + args[0] + "> supprimé des salons.");
    }
  }
};
