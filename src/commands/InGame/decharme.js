const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");
const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "decharme",
  description: "Décharme manuellement le joueur mentionné",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    message.delete();
    let lui = message.guild.member(message.mentions.users.first());
    if (lui === null) {
      message.reply("Veuillez mentionner un utilisateur valide.");
    } else {
      var charmeID = dbutils.getPlaceInDb("charmed", message);
      var charmeChan = message.guild.channels.get(charmeID);

      charmeChan.overwritePermissions(lui, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
      });
      datas.charmes[message.guild.id].splice(
        datas.charmes[message.guild.id].indexOf(lui),
        1
      );
    }
  }
};
