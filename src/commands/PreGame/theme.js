const Presets = require("../../theme/Presets.json");
const datas = require("../../global.js");

exports.run = (client, message, args) => {
  if (!datas.gameOn[message.guild.id]) {
    if (args[0] != null) {
      if (Presets[args[0]] != undefined) {
        datas.theme[message.guild.id] = args[0];
        message.channel.send("Thème de la prochaine partie : " + args[0]);
      } else {
        message.reply("Merci d'indiquer un thème valide");
      }
    } else {
      message.reply("Merci de préciser le thème désiré !");
    }
  } else {
    message.reply(
      "Impossible de changer le thème lorsqu'une partie est en cours !"
    );
  }
};
