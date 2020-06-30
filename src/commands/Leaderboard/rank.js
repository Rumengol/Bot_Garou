const dbUtils = require("../../Utils/dbUtils.js");
const datas = require("../../global.js");
const Discord = require("discord.js");

module.exports = {
  name: "rank",
  description:
    "Affiche le rang de l'utilisateur mentionné (celui de l'utilisateur de la commande s'il n'est pas précisé)",
  args: false,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["All"],
  aliases: [],
  execute(client, message, args) {
    var id;
    if (args[0] == undefined) id = message.author.id;
    else id = args[0];
    var player = dbUtils.getObjectInDb("ldb", "leaderboard", id);

    if (player == undefined)
      return message.reply("On dirait que tu n'es pas encore classé !");

    var dude = message.guild.members.get(player.id);
    var allRanks = dbUtils.sortByColumn("ldb", "leaderboard", "score");
    var rank = allRanks.indexOf(player) + 1;

    var embed = new Discord.RichEmbed()
      .setTitle(dude.nickname)
      .setDescription(player.title)
      .addField(
        `Rang : ${rank}`,
        `Parties jouées : ${player.xp}  Score : ${player.score}`
      );

    message.channel.send(embed);
  }
};
