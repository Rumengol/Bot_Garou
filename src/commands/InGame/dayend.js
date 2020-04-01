const utils = require("../../Utils/Utils.js");
const datas = require("../../global.js");
const gameUtils = require("../../Utils/gameUtils.js");
const voteUtils = require("../../Utils/voteUtils.js");

exports.run = (client, message, args) => {
  message.delete();
  voteUtils.endVote(message);
  var vivantID = utils.getRoleInDb("vivants", message);
  var vivantRole = message.guild.role.get(vivantID);
  var voteID = utils.getPlaceInDb("votes", message);
  var voteChan = message.guild.channels.get(voteID);
  var vocalID = utils.getPlaceInDb("vocal", message);
  var vocalChan = message.guild.channels.get(vocalID);

  clearInterval(datas.x[message.guild.id]);
  clearTimeout(datas.y[message.guild.id]);
  clearTimeout(datas.z[message.guild.id]);
  message.channel.overwritePermissions(vivantRole, { SEND_MESSAGES: false });
  voteChan.overwritePermissions(role, { VIEW_CHANNEL: false });
  utils.mute(role, message);
  message.channel.send("La journée s'achève. Bonne nuit.");
  if (datas.jourBE[message.guild.id]) {
    var item;
    if (!datas.IDVcache[message.guild.id]) {
      item = utils.findObjectInList(
        datas.distribRoles[message.guild.id],
        "Role",
        datas.IDV[message.guild.id]
      );
    }
    datas.banniDeVote[message.guild.id].push(item);
  }
};
