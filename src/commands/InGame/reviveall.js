var gameUtils = require("../../Utils/gameUtils.js");

module.exports = {
  name: "reviveall",
  description: "Ressuscite tous les joueurs morts",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    gameUtils.reviveAll(message);
  }
};
