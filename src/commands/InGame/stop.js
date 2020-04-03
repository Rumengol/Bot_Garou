const datas = require("../../global.js");

exports.run = (client, message, args) => {
  message.delete();
  clearInterval(datas.x[message.guild.id]);
  clearTimeout(datas.y[message.guild.id]);
  clearTimeout(datas.z[message.guild.id]);
  message.channel.send("Tous les décomptes ont été interrompus.");
};
