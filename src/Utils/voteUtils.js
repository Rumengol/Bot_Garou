var utils = require("./Utils.js");
var datas = require("../global.js");
var gameUtils = require("./gameUtils.js");

var methods = {
  endVote: function(message) {
    var pendu = { user: null, votes: -1, contenu: "personne" };
    var egalite = false;
    var townID = utils.getPlaceInDb("village", message);
    var village = message.guild.channels.get(townID);

    datas.voted[message.guild.id].forEach(vote => {
      if (vote.votes > pendu.votes && vote.votes != 0) {
        pendu = vote;
        egalite = false;
      } else if (vote.votes === pendu.votes) {
        pendu.user = pendu.user + " " + vote.user;
        pendu.contenu = pendu.contenu + " " + vote.user;
        egalite = true;
      }
      //console.log("Vote maximal : " + pendu.votes + ", vote proposé " + vote.votes)
    });

    if (pendu.votes === -1) {
      egalite = true;
    }

    if (egalite) {
      if (
        datas.distribRoles[message.guild.id]
          .map(getItem)
          .includes(datas.BE[message.guild.id])
      ) {
        var bouc = utils.findObjectInList(
          datas.distribRoles[message.guild.id],
          "Role",
          datas.BE[message.guild.id]
        );
        village.send(
          `Vous hésitez, ne sachant trop que faire. Puis tous les regards convergent vers le ${bouc.GuildMember}. Le ${bouc.Role}, il n'y a qu'à l'éliminer lui ! \n *Il va décider qui pourra voter le lendemain.*`
        );
        gameUtils.Kill(message, bouc.GuildMember);
        gameUtils.deathBE(message, bouc);
      } else {
        if (pendu.user != null) {
          village
            .send(
              `Vous n'avez pas pu vous décider, il y aura donc des prolongations (1min30).`
            )
            .then(message => {
              this.voteJour(message, pendu.user.split(" "));
              gameUtils.prolongations(message, 90000);
            });
        } else village.send("Aucun vote ? Quelle déception...");
      }
      function getItem(item) {
        return item.Role;
      }
    } else {
      village.send(
        `Après concertation, il est clair que ${pendu.contenu} était indigne de vivre.`
      );
      var item = utils.findObjectInList(
        datas.distribRoles[message.guild.id],
        "User",
        pendu.user
      );
      if (item === undefined)
        item = {
          User: pendu.user,
          Role: "dérangé",
          GuildMember: pendu.contenu
        };
      if (
        item.Role === datas.IDV[message.guild.id] &&
        datas.IDVcache[message.guild.id]
      ) {
        village.send(
          `Au moment d'éliminer ${
            pendu.contenu
          }, il devient clair qu'il est en fait ${
            item.Role
          } ! Quelqu'un comme lui n'a aucune chance d'être ${
            datas.LG[message.guild.id]
          }. Mais d'un autre côté, le vote de quelqu'un comme lui n'a aucune valeur désormais...`
        );
        datas.banniDeVote[message.guild.id].push(item);
        datas.IDVcache[message.guild.id] = false;
        return;
      }
      gameUtils.Kill(message, item.GuildMember);
    }
  },

  voteJour: function(message, egalite = null) {
    datas.votes[message.guild.id] = [];
    datas.avote[message.guild.id] = [];
    datas.voted[message.guild.id] = [];
    datas.votedejour[message.guild.id] = true;

    var vivantID = utils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);

    var voteID = utils.getPlaceInDb("votes", message);
    var voteChan = message.guild.channels.get(voteID);

    var vivants;

    if (egalite === null) {
      vivants = Array.from(
        message.guild.roles.get(vivantRole).members.values()
      );
      //console.log(vivants)
    } else {
      egalite.forEach(user => {
        vivants.push(message.guild.members.get(user));
      });
    }
    for (var i = 0; i < vivants.length; i++) {
      var temp = vivants[i].user;
      datas.voted[message.guild.id].push({
        user: temp,
        votes: 0,
        contenu: message.guild.members.get(temp.id)
      });
      vote.send(" " + vivants[i]).then(function(mess) {
        mess.react("👎");
        datas.votes[message.guild.id].push(mess);
      });
    }
  }
};

module.exports = methods;
