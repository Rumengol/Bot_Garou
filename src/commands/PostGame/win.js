const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");
const Presets = require("../../theme/Presets.json");

module.exports = {
  name: "win",
  description: "Détermine les vainqueurs",
  args: true,
  usage: "[village|LG|jdf|amoureux]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["victoire"],
  execute(client, message, args) {
    var victoire = "**VICTORIEUX** 👑";
    var defaite = "Perdant";
    var villageois = Presets[datas.theme[message.guild.id]].villageois;
    var amoureux = Presets[datas.theme[message.guild.id]].amour.Amoureux;
    var jdf = utils.findObjectInList(
      Presets[datas.theme[message.guild.id]].roles,
      "Title",
      "Joueur De Flûte"
    );

    if (datas.IDlg[message.guild.id].includes(args[0])) {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (role.Role == datas.LG[message.guild.id]) {
          role.Victoire = victoire;
        } else {
          role.Victoire = defaite;
        }
      });
      datas.win[message.guild.id] = datas.LG[message.guild.id];
      message.channel.send(
        `La victoire revient aux **${datas.LG[message.guild.id]}** !`
      );
    } else if (args[0] === "village") {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (
          role.Role != datas.LG[message.guild.id] &&
          role.Role != datas.JDF[message.guild.id]
        ) {
          role.Victoire = victoire;
        } else {
          role.Victoire = defaite;
        }
      });
      datas.win[message.guild.id] = villageois;
      message.channel.send(`La victoire revient aux **${villageois}** !`);
    } else if (args[0] === "amoureux") {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (datas.Lovers[message.guild.id].includes(role)) {
          role.Victoire = victoire;
        } else {
          role.Victoire = defaite;
        }
      });

      datas.win[message.guild.id] = amoureux;
      message.channel.send(`La victoire revient aux **${amoureux}** !`);
    } else if (datas.IDjdf[message.guild.id].includes(args[0])) {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (role.Role === datas.JDF[message.guild.id]) {
          role.Victoire = victoire;
        } else {
          role.Victoire = defaite;
        }
      });

      datas.win[message.guild.id] = jdf.Name;
      message.channel.send(`La victoire revient au **${jdf.Name}** !`);
    } else {
      message.reply("Je n'ai pas compris " + args[0] + ". Qui a gagné ?");
    }
  }
};
