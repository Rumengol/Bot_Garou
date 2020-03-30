const datas = require("../../global.js");

exports.run = (client, message, args) => {
if (datas.compoDone[message.guild.id]) {
    Distribution(message);
  }
  else {
    message.reply("La composition n'est pas terminée !")
  }
}