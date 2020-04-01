var utils = require("./Utils.js");
var datas = require("../global.js");
const Presets = require("../../theme/Presets.json");

var methods = {
  Kill: function(message, lui) {
    var roleID = utils.getRoleInDb("vivants", message);
    var role = message.guild.roles.get(roleID);
    setTimeout(() => {
      var roleID2 = utils.getRoleInDb("morts", message);
      var role2 = message.guild.roles.get(roleID2);
      lui.addRole(role2);
    }, 500);

    setTimeout(() => {
      lui.removeRole(role);
    }, 3000);
    var lieuID = utils.getPlaceInDb("village", message);
    var lieu = message.guild.channels.get(lieuID);

    var lieuID2 = utils.getPlaceInDb("vocal", message);
    var vocal = message.guild.channels.get(lieuID2);

    var item = utils.findObjectInList(
      datas.distribRoles[message.guild.id],
      "GuildMember",
      lui
    );
    if (item != undefined) {
      if (datas.charmes[message.guild.id] != undefined)
        datas.charmes[message.guild.id].splice(
          datas.charmes[message.guild.id].indexOf(item.GuildMember),
          1
        );

      rolmort = ", il/elle était " + item.Role + ".";
      datas.distribRolMorts[message.guild.id].push(item);
      datas.distribRoles[message.guild.id].splice(
        datas.distribRoles[message.guild.id].indexOf(item),
        1
      );
    } else {
      rolmort = ".";
    }

    if (vocal.members.has(lui)) lui.setMute(true);
    message.guild.channels.get(lieu).send(lui + " est mort" + rolmort);
    var lieuID3 = utils.getPlaceInDb("charmed", message);
    var charmeChannel = message.guild.channels.get(lieuID3);

    message.guild.channels
      .get(charmeChannel)
      .overwritePermissions(lui, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

    if (datas.joueursLG[message.guild.id].includes(lui)) {
      var lieuID4 = utils.getPlaceInDb("loups", message);
      var loupChannel = message.guild.channels.get(lieuID4);
      message.guild.channels
        .get(loupChannel)
        .overwrittePermissions(lui, { SEND_MESSAGES: false });
    }

    if (datas.Lovers[message.guild.id].includes(item)) {
      var dead = Presets[datas.theme[message.guild.id]].amour.OnDeath.split(
        "|"
      );
      datas.Lovers[message.guild.id].splice(
        datas.Lovers[message.guild.id].indexOf(item),
        1
      );
      message.guild.channels
        .get(lieu)
        .send(dead[0] + datas.Lovers[message.guild.id][0].User + dead[1])
        .then(mess => {
          var amorreux = datas.Lovers[message.guild.id][0].GuildMember;
          datas.Lovers[message.guild.id] = [];
          this.Kill(mess, amorreux);
        });
    }
  },

  reviveAll = function(message){
    var roleMortID = utils.getRoleInDb("morts", message);
    var roleMort = message.guild.roles.get(roleMortID);
    var roleVivID = utils.getRoleInDb("vivants", message);
    var roleViv = message.guild.roles.get(roleVivID);

    var vocalID = utils.getPlaceInDb("vocal", message);

  eux = roleMort.members;
  eux.forEach(lui => {
    setTimeout(() => {
      lui.addRole(roleViv);
    }, 500);
    if (vocal.members.has(lui))
      lui.setMute(false);
    //Retirer le rôle en deuxième pour éviter de déco les joueurs portable
    setTimeout(() => {
      lui.removeRole(roleMort);
    }, 1000);
  });
  console.log("Réussite du reviveall");
  }
};

module.exports = methods;
