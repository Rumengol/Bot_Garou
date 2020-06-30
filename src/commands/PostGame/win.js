const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");
const Presets = require("../../../themes/Presets.json");
const rankUtils = require("../../Utils/rankUtils.js");

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

    //Vicoire des loups garous
    if (datas.IDlg[message.guild.id].includes(args[0])) {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (role.Role == datas.LG[message.guild.id]) {
          role.Victoire = victoire;
          role.Score = 2;
        } else {
          role.Victoire = defaite;
        }
      });

      datas.distribRolMorts[message.guild.id].forEach(role => {
        if (role.Role == datas.LG[message.guild.id]) {
          role.Victoire = victoire;
          role.Score = 1;
        }
      });
      datas.win[message.guild.id] = datas.LG[message.guild.id];
      message.channel.send(
        `La victoire revient aux **${datas.LG[message.guild.id]}** !`
      );
    }

    //Victoire des villageois
    else if (args[0] === "village") {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (
          role.Role != datas.LG[message.guild.id] &&
          role.Role != datas.JDF[message.guild.id]
        ) {
          role.Victoire = victoire;
          role.Score = 1;
        } else {
          role.Victoire = defaite;
        }
      });
      datas.win[message.guild.id] = villageois;
      message.channel.send(`La victoire revient aux **${villageois}** !`);
    }

    //Victoire des amoureux
    else if (args[0] === "amoureux") {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (datas.Lovers[message.guild.id].includes(role)) {
          role.Victoire = victoire;
          role.Score = 10;
        } else {
          role.Victoire = defaite;
        }
      });

      datas.win[message.guild.id] = amoureux;
      message.channel.send(`La victoire revient aux **${amoureux}** !`);
    }

    //Victoire du joueur de flûte
    else if (datas.IDjdf[message.guild.id].includes(args[0])) {
      datas.distribRoles[message.guild.id].forEach(role => {
        if (role.Role === datas.JDF[message.guild.id]) {
          role.Victoire = victoire;
          role.Score = 7;
        } else {
          role.Victoire = defaite;
        }
      });

      datas.win[message.guild.id] = jdf.Name;
      message.channel.send(`La victoire revient au **${jdf.Name}** !`);
    } else {
      message.reply("Je n'ai pas compris " + args[0] + ". Qui a gagné ?");
    }

    datas.distribRoles[message.guild.id].forEach(role => {
      rankUtils.scoreUp(role.User.Id, role.Score);
    });

    datas.distribRolMorts[message.guild.id].forEach(role => {
      rankUtils.scoreUp(role.User.Id, role.Score);
    });
  }
};
