const datas = require("../global.js");
const dbutils = require("./dbUtils.js");

var methods = {
  UsePotMort: function(message, guild, theme) {
    if (datas.potMort[guild.id]) {
      message.channel.send(
        "Sur qui souhaites-tu utiliser " +
          theme.potions.Mort +
          " ? \n**0.** Personne\n" +
          datas.vivants[guild.id] +
          "*N'indiquez que le numéro du joueur, par exemple ``0`` pour ne tuer personne.*"
      );
      var filter = m => datas.inscrits[guild.id].includes(m.author.id);
      var collector2 = message.channel.createCollector(filter);
      collector2.on("collect", mess => {
        var cible = parseInt(mess);
        var lui = [];
        if (
          !isNaN(cible) &&
          0 < cible &&
          cible <= datas.Listvivants[guild.id].length
        ) {
          lui.push(datas.distribRoles[guild.id][cible - 1]);
          if (lui[0] === undefined) {
            console.log("erreur avec cible = " + cible);
          } else {
            var meurtre = theme.potions.Kill.split("|");
            mess.channel.send(meurtre[0] + lui[0].User.username + meurtre[1]);
            datas.salonLog[guild.id].send(
              datas.Soso[guild.id] +
                " a décidé de tuer **" +
                lui[0].User.username +
                "**."
            );
            datas.potMort[guild.id] = false;
            collector2.stop();
          }
        } else if (cible == 0) {
          mess.channel.send(
            "Tu décides que ce n'est pas encore le moment. Peut être une prochaine fois."
          );
          datas.salonLog[guild.id].send(
            datas.Soso[guild.id] + " n'a voulu tuer personne."
          );
          collector2.stop();
        }
      });
    }
  },

  Charme: function(message, lui, welcome) {
    var charmeID = dbutils.getPlaceInDb("charmed", message);
    var charmeChan = message.guild.channels.get(charmeID);
    charmeChan.overwritePermissions(lui, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: false
    });
    message.guild.channels
      .get(charmeChan)
      .send(lui + " vient de se faire " + welcome[1] + " !");
    datas.charmes[message.guild.id].push(lui);
  }
};

module.exports = methods;
