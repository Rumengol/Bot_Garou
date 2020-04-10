const utils = require("../../Utils/Utils.js");
const datas = require("../../global.js");
const voteUtils = require("../../Utils/voteUtils.js");
const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "dayend",
  description: "Achève le jour prématurément",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["finjour", "findujour"],
  execute(client, message, args) {
    message.delete();
    voteUtils.endVote(message);
    var vivantID = dbutils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);
    var voteID = dbutils.getPlaceInDb("votes", message);
    var voteChan = message.guild.channels.get(voteID);

    clearInterval(datas.x[message.guild.id]);
    clearTimeout(datas.y[message.guild.id]);
    clearTimeout(datas.z[message.guild.id]);
    message.channel.overwritePermissions(vivantRole, { SEND_MESSAGES: false });
    voteChan.overwritePermissions(vivantRole, { VIEW_CHANNEL: false });
    utils.mute(vivantRole, message);
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
  }
};
