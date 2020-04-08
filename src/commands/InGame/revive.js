const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "revive",
  description: "Ressuscite manuellement le joueur mentionné",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    let lui = message.guild.member(message.mentions.users.first());
    var roleMortID = dbutils.getRoleInDb("morts", message);
    var roleMort = message.guild.roles.get(roleMortID);
    var roleVivID = dbutils.getRoleInDb("vivants", message);
    var roleViv = message.guild.roles.get(roleVivID);
    lui.addRole(roleViv);
    setTimeout(() => {
      lui.removeRole(roleMort);
    }, 1000);
    var townID = dbutils.getPlaceInDb("village", message);
    var town = message.guild.channels.get(townID);
    town.send(lui + " a ressuscité !");
    var vocalID = dbutils.getPlaceInDb("vocal", message);
    var vocal = message.guild.channels.get(vocalID);
    if (vocal.members.has(lui)) lui.setMute(false);
  }
};
