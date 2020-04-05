const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "defadmin",
  description:
    "Définie un administrateur du bot. Commande réservée au propriétaire du bot.",
  args: true,
  usage: "[@Membre]",
  guildOnly: false,
  canDo: ["Owner"],
  aliases: ["admin"],
  execute(client, message, args) {
    if (args == null) {
      message.channel.send("Il faut préciser un utilisateur.");
    }
    admin = args[0];
    var number = dbutils.getAllValuesInDb("db", "administrateurs", "id").length;
    var obj = { id: number, story_value: admin, user: admin.id };
    dbutils.writeInDb("db", "administrateurs", obj);

    message.channel.send(
      "Enregistré, " + admin + " est désormais administrateur."
    );
  }
};
