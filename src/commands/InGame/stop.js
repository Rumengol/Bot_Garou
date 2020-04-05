const datas = require("../../global.js");

module.exports = {
  name: "stop",
  description: "Arrête tous les décomptes en cours",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    message.delete();
    clearInterval(datas.x[message.guild.id]);
    clearTimeout(datas.y[message.guild.id]);
    clearTimeout(datas.z[message.guild.id]);
    message.channel.send("Tous les décomptes ont été interrompus.");
  }
};
