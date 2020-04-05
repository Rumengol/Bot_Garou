const datas = require("../../global.js");
const voteUtils = require("../../Utils/voteUtils.js");

module.exports = {
  name: "vote",
  description:
    'Lance un vote. Ajoutez l\'argument "jour" pour lancer un vote de jour',
  args: true,
  usage: "[vote1,vote2,...]||jour",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    datas.votes[message.guild.id] = [];
    datas.avote[message.guild.id] = [];
    datas.voted[message.guild.id] = [];
    if (args[0] === "jour") {
      message.delete();
      voteUtils.voteJour(message);
    } else {
      datas.votedejour[message.guild.id] = false;
      message.delete();
      let votelist = args[0].split(",");
      for (var i = 0; i < votelist.length; i++) {
        message.channel.send(votelist[i]).then(function(message) {
          message.react("👎");
          datas.votes[message.guild.id].push(message);
        });
      }
    }
  }
};
