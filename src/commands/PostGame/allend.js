const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");
const gameUtils = require("../../Utils/gameUtils.js");

exports.run = (client, message, args) => {
  gameUtils.reviveAll(message);

  datas.gameOn[message.guild.id] = false;
  var vivantID = utils.getRoleInDb("vivants", message);
  var vivantRole = message.guild.roles.get(vivantID);

  var vocalID = utils.getPlaceInDb("vocal", message);
  var vocalChan = message.guild.channels.get(vocalID);

  var generalID = utils.getPlaceInDb("general", message);
  var generalChan = message.guild.channels.get(generalID);

  datas.eux[message.guild.id] = vivantRole.members;
  if (vocalChan === generalChan) {
    message.channel.send(
      "Session terminée, merci d'avoir joué ! A la prochaine fois !"
    );
  } else {
    message.channel.send(
      "Session terminée, merci d'avoir joué ! Les participants seront déplacés dans le salon vocal général d'ici 3 secondes..."
    );
    blep = setTimeout(function() {
      datas.eux[message.guild.id].forEach(lui => {
        if (vocalChan.members.has(lui)) lui.setVoiceChannel(generalChan);
        lui.removeRole(vivantRole);
      });
    }, 3000);
  }
};
