const datas = require("../../global.js");
const compo = require("../../Utils/compoUtils.js");
const themes = require("../../Utils/themeUtils.js");
const Theme = require("../../../themes/Themes.js");
const Discord = require("discord.js");

module.exports = {
  name: "compo",
  description: "Lance l'assistant de composition",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["composition"],
  execute(client, message, args) {
    var themeAct = new Theme().preset(datas.theme[message.guild.id]);
    datas.gameOn[message.guild.id] = true;
    message.delete();
    datas.compo[message.guild.id] = [];
    var embed = new Discord.RichEmbed()
      .setTitle("Composition de la partie :")
      .setDescription(
        "Préparez la composition de la partie à l'aide des commandes ci-dessous."
      )
      .addField(
        "Le thème sélectionné pour cette partie est le thème **" +
          themeAct.name +
          "**. ",
        themeAct.description
      )
      .addField(
        "**__Informations__**",
        " Vous pouvez ajouter des rôles en tapant ``+ [rôle] [nombre]`` et en retirer en tapant ``- [rôle] [nombre]``. Par défaut, le nombre est de 1.\n Vous pouvez vérifier la liste des rôles reconnus en tapant ``roles?``, annuler en tapant ``annuler``, et si vous avez terminé, tapez ``terminé``."
      );

    themes.setTheme(themeAct, message);
    message.channel.send(embed);
    collector2 = message.channel.createCollector(filter);
    compo.prepCompo(collector2);
  }
};
