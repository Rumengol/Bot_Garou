const datas = require("../global.js");
const utils = require("../Utils/Utils.js");

module.exports = (client, reac, user) => {
  try {
    if (reac.message.channel.type != "dm") {
      var vivantID = utils.getRoleInDb("vivants", reac.message);
      var vivantRole = reac.message.guild.get(vivantID);

      //Gestion des réactions d'inscription
      if (reac.message === datas.inscr[reac.message.guild.id]) {
        if (datas.gameOn[reac.message.guild.id] === false) {
          //Si on a atteint le maximum d'inscriptions
          if (reac.count > datas.maxP[reac.message.guild.id] + 1) {
            reac.remove(user);
            user.createDM().then(channel => {
              channel.send(
                "Inscription refusée, la partie est déjà complète. Essaie la prochaine !"
              );
            });
          } else {
            //Sinon, et en ignorant la première réaction (celle du bot)
            if (reac.count > 1) {
              datas.inscrits[reac.message.guild.id].push(user.id);
              reac.message.guild.members.get(user.id).addRole(vivantRole);
              datas.inscrep[reac.message.guild.id].push(user);

              reac.message.edit(
                new Discord.RichEmbed()
                  .setTitle("Inscriptions pour les parties de loup Garou")
                  .setDescription(
                    "Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
                      datas.maxP[reac.message.guild.id] +
                      "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
                  )
                  .addField(
                    "Joueurs inscrits :",
                    datas.inscrep[reac.message.guild.id]
                  )
              );
            }
          }
        } else {
          user.createDM().then(channel => {
            reac.remove(user);
            channel.send(
              "Une partie est déjà en cours, il est impossible de s'inscrire !"
            );
          });
        }
      }

      //Gestion des votes
      else if (datas.votes[reac.message.guild.id].includes(reac.message)) {
        //Vérifie que celui qui vote est bien vivant et que c'est un vote du jour
        if (!user.bot) {
          var item = utils.findObjectInList(
            datas.distribRoles[reac.message.guild.id],
            "GuildMember",
            user
          );
          var luiroles = reac.message.guild.members
            .get(user.id)
            .roles.map(r => r.id);
          if (datas.banniDeVote[reac.message.guild.id].includes(item)) {
            datas.avote[reac.message.guild.id].push(item.User);
          }
          if (
            luiroles.includes(vivantRole) &&
            datas.votedejour[reac.message.guild.id]
          ) {
            if (!datas.avote[reac.message.guild.id].includes(user)) {
              datas.avote[reac.message.guild.id].push(user);
            } else {
              datas.avote[reac.message.guild.id].push(user);
              reac.remove(user);
            }
            var membre = reac.message.content.split("<@!");
            if (membre[1] === undefined)
              membre = reac.message.content.split("<@");
            membre = membre[1].split(">");
            var item2 = utils.findObjectInList(
              datas.voted[reac.message.guild.id],
              "contenu",
              reac.message.guild.members.get(membre[0])
            );
            item2.votes += 1;
          } else {
            if (datas.votedejour[reac.message.guild.id]) {
              reac.remove(user);
            }
          }
        }
      }
    }
  } catch (e) {
    reac.message.reply(e.message);
    console.log(e);
  }
};
