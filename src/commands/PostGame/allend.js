const datas = require("../../global.js");
const gameUtils = require("../../Utils/gameUtils.js");
const dbutils = require("../../Utils/dbUtils.js");

module.exports = {
  name: "allend",
  description: "Achève la session de jeu, réinitialise tout",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    gameUtils.reviveAll(message);

    datas.gameOn[message.guild.id] = false;
    var vivantID = dbutils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);

    var vocalID = dbutils.getPlaceInDb("vocal", message);
    var vocalChan = message.guild.channels.get(vocalID);

    var generalID = dbutils.getPlaceInDb("general", message);
    var generalChan = message.guild.channels.get(generalID);

    if (vocalChan === generalChan) {
      message.channel.send(
        "Session terminée, merci d'avoir joué ! A la prochaine fois !"
      );
    } else {
      message.channel.send(
        "Session terminée, merci d'avoir joué ! Les participants seront déplacés dans le salon vocal général d'ici 3 secondes..."
      );
      blep = setTimeout(function() {
        vivantRole.members.forEach(lui => {
          if (vocalChan.members.has(lui.id)) lui.setVoiceChannel(generalChan);
          lui.removeRole(vivantRole);
        });
      }, 3000);
    }
  }
};
