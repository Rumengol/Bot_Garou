const Presets = require("../../../themes/Presets.json");
const Discord = require("discord.js");

module.exports = {
  name: "ask",
  description: "Demande la description d'un rôle",
  args: true,
  usage: "[Role]",
  guildOnly: false,
  canDo: ["All"],
  aliases: [],
  execute(client, message, args) {
    var contenu = args.join(" ").toLowerCase();

    for (var theme in Presets) {
      var role = Presets[theme].roles;
      for (var i = 0; i < role.length; i++) {
        if (role[i].Id.split(",").includes(contenu)) {
          role = role[i];
          embedHelp = new Discord.RichEmbed()
            .setTitle(role.Name)
            .setDescription(role.Description)
            .setThumbnail(role.Thumbnail)
            .setColor(role.Color)
            .addField("Son but", role.Goal)
            .addField("Quand gagne-t-il ?", role.Win)
            .addField("Pouvoir", role.Power);

          message.channel.send(embedHelp);
          return;
        }
      }
    }
  }
};
