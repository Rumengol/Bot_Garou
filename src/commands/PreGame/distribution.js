const datas = require("../../global.js");
const distrib = require("../../Utils/distribUtils.js");

exports.run = (client, message, args) => {
  if (datas.compoDone[message.guild.id]) {
    distrib.Distribution(message);
  } else {
    message.reply("La composition n'est pas terminée !");
  }
};
