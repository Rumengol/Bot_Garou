const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "supadmin",
  description:
    "Supprime un administrateur général. Commande réservée au propriétaire.",
  args: true,
  usage: "[@Membre]",
  guildOnly: false,
  canDo: ["Owner"],
  aliases: ["suppradmin"],
  execute(client, message, args) {
    noadmin = args[0];
    dbutils.removeFromDb("db", "administrateur", { story_value: noadmin });
    message.reply(noadmin + " supprimé des administrateurs.");
  }
};
