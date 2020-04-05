const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");
const gameUtils = require("../../Utils/gameUtils.js");

module.exports = {
  name: "gamend",
  description: "Achève la partie en cours.",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    var loupID = utils.getPlaceInDb("loups", message);
    var loupChan = message.guild.channels.get(loupID);

    var vivantID = utils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);

    var charmeID = utils.getPlaceInDb("charmed", message);
    var charmeChan = message.guild.channels.get(charmeID);

    var townID = getPlaceInDb("village", message);
    var village = message.guild.channels.get(townID);

    if (win[message.guild.id] != null) gameUtils.Recap(village);
    else
      message.channel.send(
        "La victoire n'a pas été déclarée, le récapitulatif de la partie ne sera pas affiché."
      );
    gameUtils.reviveAll(message);
    utils.unmute(vivantRole, message);

    setTimeout(() => {
      vivantRole.members
        .map(m => m.user)
        .forEach(vivant => {
          loupChan.overwritePermissions(vivant, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
          });
          charmeChan.overwritePermissions(vivant, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
          });
        });
    }, 3000);

    datas.charmes[message.guild.id] = [];
    if (datas.messCompo[message.guild.id] != null) {
      datas.messCompo[message.guild.id].unpin();
    }
    datas.init(message.guild);

    datas.gameOn[message.guild.id] = false;

    clearInterval(datas.x[message.guild.id]);
    clearTimeout(datas.y[message.guild.id]);
    clearTimeout(datas.z[message.guild.id]);

    message.channel.send("Partie terminée, merci d'avoir joué !");
  }
};
