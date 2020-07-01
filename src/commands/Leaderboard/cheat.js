const rankUtils = require("../../Utils/rankUtils.js");
const datas = require("../../global.js");

module.exports = {
  name: "cheat",
  description: "LA TRICHE",
  args: true,
  usage: "[Montant]",
  guildOnly: true,
  canDo: ["Administrateur"],
  aliases: [],
  execute(client, message, args) {
    rankUtils.scoreUp(message.author.id, parseInt(args[0]));
    message.channel.send(`Score de ${message.author} augmenté de ${args[0]}.`);
  }
};
