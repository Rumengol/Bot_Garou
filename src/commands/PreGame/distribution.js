const datas = require("../../global.js");
const distrib = require("../../Utils/distribUtils.js");

module.exports = {
  name: "distribution",
  description: "Distribue aléatoirement les rôles",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    if (datas.compoDone[message.guild.id]) {
      distrib.Distribution(message);
    } else {
      message.reply("La composition n'est pas terminée !");
    }
  }
};
