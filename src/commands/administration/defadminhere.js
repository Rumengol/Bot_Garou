const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "defadminhere",
  description:
    "Définie un administrateur sur ce serveur. Commande réservée aux administrateurs généraux ou sur ce serveur.",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["adminhere", "adminloc", "adminlocal"],
  execute(client, message, args) {
    admin = args[0];
    var number = dbutils.getAllValuesInDb("db", "ministrateurs", "id").length;
    var obj = { id: number, story_value: admin, guild: message.guild.id };
    dbutils.writeInDb("db", "ministrateurs", obj);
    message.channel.send(
      "Enregistré, " + admin + " est désormais administrateur sur ce serveur."
    );
  }
};
