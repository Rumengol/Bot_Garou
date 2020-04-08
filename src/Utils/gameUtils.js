const utils = require("./Utils.js");
const datas = require("../global.js");
const Presets = require("../../themes/Presets.json");
const dbutils = require("./dbUtils.js");
const Discord = require("discord.js");

var methods = {
  Kill: function(message, lui) {
    var roleID = dbutils.getRoleInDb("vivants", message);
    var role = message.guild.roles.get(roleID);
    setTimeout(() => {
      var roleID2 = dbutils.getRoleInDb("morts", message);
      var role2 = message.guild.roles.get(roleID2);
      lui.addRole(role2);
    }, 500);

    setTimeout(() => {
      lui.removeRole(role);
    }, 3000);
    var lieuID = dbutils.getPlaceInDb("village", message);
    var lieu = message.guild.channels.get(lieuID);

    var lieuID2 = dbutils.getPlaceInDb("vocal", message);
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
    var lieuID3 = dbutils.getPlaceInDb("charmed", message);
    var charmeChannel = message.guild.channels.get(lieuID3);

    message.guild.channels
      .get(charmeChannel)
      .overwritePermissions(lui, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

    if (datas.joueursLG[message.guild.id].includes(lui)) {
      var lieuID4 = dbutils.getPlaceInDb("loups", message);
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

  reviveAll: function(message) {
    var roleMortID = dbutils.getRoleInDb("morts", message);
    var roleMort = message.guild.roles.get(roleMortID);
    var roleVivID = dbutils.getRoleInDb("vivants", message);
    var roleViv = message.guild.roles.get(roleVivID);

    var vocalID = dbutils.getPlaceInDb("vocal", message);

    eux = roleMort.members;
    eux.forEach(lui => {
      setTimeout(() => {
        lui.addRole(roleViv);
      }, 500);
      if (vocal.members.has(lui)) lui.setMute(false);
      //Retirer le rôle en deuxième pour éviter de déco les joueurs portable
      setTimeout(() => {
        lui.removeRole(roleMort);
      }, 1000);
    });
    console.log("Réussite du reviveall");
  },

  prolongations: function(message, endTimer) {
    var vivantID = dbutils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);
    message.channel.overwritePermissions(vivantRole, { SEND_MESSAGES: true });
    var votesID = dbutils.getPlaceInDb("votes", message);
    var voteChan = message.guild.channels.get(votesID);
    var vocalID = dbutils.getPlaceInDb("vocal", message);
    var vocalChan = message.guild.channels.get(vocalID);
    voteChan.overwritePermissions(vivantRole, { VIEW_CHANNEL: true });
    utils.unmute(vivantRole, message);
    var limite = 90;
    datas.x[message.guild.id] = setInterval(function() {
      message.channel.send(limite + " secondes restantes.");
      limite -= 30;
    }, 30000);
    datas.z[message.guild.id] = setTimeout(function() {
      message.channel.overwritePermissions(role, {
        SEND_MESSAGES: false
      });
      message.channel.send("La journée s'achève. Bonne nuit.");
      voteChan.overwritePermissions(role, { VIEW_CHANNEL: false });
      utils.mute(vivantRole, message);
      clearInterval(datas.x[message.guild.id]);
      this.endVote(message);
    }, finpouet);
  },

  deathBE: function(message, item) {
    var chan = item.User.dmChannel;
    const filter2 = m => datas.inscrits[message.guild.id].includes(m.author.id);
    chan.send(
      "Tu as été éliminé par défaut, " +
        datas.BE[message.guild.id] +
        " ! Mais dans ton dernier souffle, tu peux décider qui est digne de voter demain. \n **0.** Personne \n" +
        datas.vivants[message.guild.id] +
        " \n *N'indiquez que les numéros sous la forme X-Y-... Par exemple, ``1-2`` pour permettre à " +
        datas.distribRoles[message.guild.id][0].User.username +
        " et " +
        datas.distribRoles[message.guild.id][1].User.username +
        " de voter.*"
    );
    var collector = chan.createCollector(filter2);
    datas.eux[message.guild.id] = [];

    collector.on("collect", mess => {
      var choix = [];
      var splitemess = mess.content.toLowerCase().split("-");
      for (var i = 0; i < splitemess.length; i++) {
        choix.push(datas.distribRoles[message.guild.id][splitemess[i] - 1]);
      }
      var reply = choix.map(getUser).join(", ");
      mess.channel.send("Voici ceux qui peuvent voter demain : " + reply);

      var annonce = choix.map(getMember).join(", ");
      message.channel.send(
        `Le ${
          datas.BE[message.guild.id]
        } a choisi dans son dernier souffle. Seuls ${annonce} pourront voter demain.`
      );
      datas.banniDeVote[message.guild.id].concat(choix);
      //console.log(banniDeVote[message.guild.id]);
      //console.log(choix)
      datas.jourBE[message.guild.id] = true;
      collector.stop();
    });
    function getUser(item) {
      return item.User.username;
    }
    function getMember(item) {
      return item.GuildMember;
    }
  },

  Recap: function(channel) {
    embedRecap = new Discord.RichEmbed()
      .setTitle("Récapitulatif de la partie")
      .setDescription("Victoire des **" + datas.win[channel.guild.id] + "** !")
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte2.png"
      )
      .setColor("#FFFF00");

    datas.distribRoles[channel.guild.id].forEach(role => {
      embedRecap.addField(
        role.Victoire,
        role.User + " était **" + role.Role + "** *(vivant)*."
      );
    });

    datas.distribRolMorts[channel.guild.id].forEach(mort => {
      embedRecap.addField(
        "Perdant",
        mort.User + " était **" + mort.Role + "** *(mort)*."
      );
    });

    channel.send(embedRecap);
  }
};

module.exports = methods;
