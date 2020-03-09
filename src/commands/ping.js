const bot = require("../../index.js");
exports.run = (client, message, args) => {
  if (bot.adminlist.includes(message.author)) {
    message.reply(
      "Pong, mais depuis le command handler ! \n *Rang de l'utilisateur : Propriétaire.*"
    );
  } else if (bot.mini[message.guild.id]) {
    message.reply("Pong ! \n *Rang de l'utilisateur : Administrateur local.*");
  } else {
    message.reply("Pong.");
  }
};
