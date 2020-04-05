const Presets = require("../../theme/Presets.json");
const datas = require("../../global.js");

module.exports = {
  name: "theme",
  description:
    "Définie le thème pour la prochaine partie. Par défaut, il s'agit du thème classique",
  args: true,
  usage: "[theme]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    if (!datas.gameOn[message.guild.id]) {
      if (Presets[args[0]] != undefined) {
        datas.theme[message.guild.id] = args[0];
        message.channel.send("Thème de la prochaine partie : " + args[0]);
      } else {
        message.reply("Merci d'indiquer un thème valide");
      }
    } else {
      message.reply(
        "Impossible de changer le thème lorsqu'une partie est en cours !"
      );
    }
  }
};
