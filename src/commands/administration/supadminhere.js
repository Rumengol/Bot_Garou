const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "supadminhere",
  description:
    "Supprime un administrateur local. Commande réservée aux administrateurs généraux et au propriétaire du serveur.",
  args: true,
  usage: "[@Membre]]",
  guildOnly: true,
  canDo: ["Administrateur", "guildmaster"],
  aliases: ["suppradminhere", "supadminloc", "supadminlocal"],
  execute(client, message, args) {
    noadmin = args[0];
    var obj = { guild: message.guild.id, story_value: noadmin };
    dbutils.removeFromDb("db", "ministrateurs", obj);
    message.reply(noadmin + " supprimé des administrateurs de ce serveur.");
  }
};
