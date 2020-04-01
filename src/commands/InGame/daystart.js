const utils = require("../../Utils/Utils.js");
const datas = require("../../global.js");
const Presets = require("../../../themes/Presets.json");

exports.run = (client, message, args) => {
  if (args[0] != null && args[0].match(/^\d+$/)) {
    datas.pouet[message.guild.id] = parseInt(args[0]);
  } else {
    datas.pouet[message.guild.id] = 5;
  }
  var finpouet = datas.pouet[message.guild.id] * 60000;
  datas.StateOfTheGame[message.guild.id][0] =
    Presets[datas.theme[message.guild.id]].time.Day;

  message.delete();
  var vivantID = utils.getRoleInDb("vivants", message);
  var vivantRole = message.guild.role.get(vivantID);

  message.channel.overwritePermissions(vivant, { SEND_MESSAGES: true });
  utils.unmute(vivantRole, message);
  message.channel.send(
    "Une nouvelle journée commence. (" +
      datas.StateOfTheGame[message.guild.id].join(" ") +
      ")"
  );
  var voteID = utils.getPlaceInDb("votes", message);
  var voteChan = message.guild.channels.get(voteID);
  var vocalID = utils.getPlaceInDb("vocal", message);
  var vocalChan = message.guild.channels.get(vocalID);
  if (voteChan == null || vocalChan == null) {
    message.reply("Salon de vote ou vocal non défini");
  } else {
    voteChan.overwritePermissions(vivantRole, { VIEW_CHANNEL: true });
    unmute(vivantRole, message);
    datas.x[message.guild.id] = setInterval(function() {
      message.channel.send(
        datas.pouet[message.guild.id] + " minutes restantes."
      );
      datas.pouet[message.guild.id] -= 1;
    }, 60000);
    datas.y[message.guild.id] = setTimeout(function() {
      message.channel.send("30 secondes restantes.");
      clearInterval(datas.x[message.guild.id]);
    }, finpouet - 30000);
    datas.z[message.guild.id] = setTimeout(function() {
      message.channel.overwritePermissions(vivantRole, {
        SEND_MESSAGES: false
      });
      message.channel.send("La journée s'achève. Bonne nuit.");
      voteChan.overwritePermissions(vivantRole, { VIEW_CHANNEL: false });
      utils.mute(vivantRole, message);
      gameUtils.endVote(message);
    }, finpouet);
  }
};
