var gameUtils = require("../../Utils/gameUtils.js");

module.exports = {
  name: "kill",
  description: "Tue le joueur mentionné",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    let lui = message.guild.member(message.mentions.users.first());
    gameUtils.Kill(message, lui);
  }
};
