const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");

module.exports = {
  name: "charme",
  description: "Charme le joueur mentionné",
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
      var charmeID = utils.getPlaceInDb("charmed", message);
      var charmeChan = message.guild.channels.get(charmeID);

      charmeChan.overwritePermissions(lui, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false
      });
      charmeChan.send(lui + " vient de se faire charmer !");
      datas.charmes[message.guild.id].push(lui);
    }
  }
};
