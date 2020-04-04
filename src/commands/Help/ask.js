const Presets = require("../../theme/Presets.json");

exports.run = (client, message, args) => {
  var contenu = args.join(" ");

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
};
