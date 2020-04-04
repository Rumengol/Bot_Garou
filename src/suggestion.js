const Discord = require("discord.js");

exports.run = (client, message, args) => {
  var contenu = args.join(" ");
  bot.fetchUser("218701822670405633").then(moi => {
    var embed = new Discord.RichEmbed()
      .setTitle("Nouvelle suggestion")
      .setDescription("Suggestion de " + message.author.tag)
      .setThumbnail(message.author.avatarURL)
      .addField("Suggestion :", contenu)
      .setFooter("Suggestion faite le " + message.createdAt);
    moi.createDM().then(channel => {
      channel.send(embed);
    });
  });
};
