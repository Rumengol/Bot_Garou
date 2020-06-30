const dbutils = require("../../Utils/dbUtils.js");
const datas = require("../../global.js");

module.exports = {
  name: "leaderboard",
  description: "Affiche le tableau des scores",
  args: true,
  usage: "[global|local]",
  guildOnly: true,
  canDo: ["All"],
  aliases: [],
  execute(client, message, args) {
    message.reply("Il n'y a pas encore de leaderboard !");
  }
};
