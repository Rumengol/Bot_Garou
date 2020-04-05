const gameUtils = require("../../Utils/gameUtils.js");
const datas = require("../../global.js");

module.exports = {
  name: "prolong",
  description: "Lance des prolongations pour le jour en cours",
  args: false,
  usage: "[Temps des prolongations]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["prolongation", "prolongations"],
  execute(client, message, args) {
    if (args[0] != null && args[0].match(/^\d+$/)) {
      datas.pouet[message.guild.id] = parseInt(args[0]);
    } else {
      datas.pouet[message.guild.id] = 90;
    }
    var finpouet = datas.pouet[message.guild.id] * 6000;

    message.delete();
    message.channel.send(
      "Une égalité dans les votes mène toujours à des débats supplémentaires."
    );
    gameUtils.prolongations(message, finpouet);
  }
};
