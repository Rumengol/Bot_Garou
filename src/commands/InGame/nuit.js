const utils = require("../../Utils/Utils.js");
const datas = require("../../global.js");
const dbutils = require("../../Utils/dbUtils.js");
const Presets = require("../../../themes/Presets.json");
const nightUtils = require("../../Utils/nightUtils.js");
const Discord = require("discord.js");

module.exports = {
  name: "nuit",
  description: "Lance la nuit, et l'assistant automatique",
  args: false,
  usage: "",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["night"],
  execute(client, message, args) {
    const filter = m =>
      m.author === message.author || datas.adminlist.includes(m.author);
    const filter2 = m => inscrits[message.guild.id].includes(m.author.id);
    const filterSoso = reac =>
      reac.emoji.name === "✅" || reac.emoji.name === "❌";
    const filterLG = m => joueursLG[message.guild.id].includes(m.author);

    var theme = Presets[datas.theme[message.guild.id]];
    datas.StateOfTheGame[message.guild.id][0] =
      Presets[datas.theme[message.guild.id]].time.Night;
    datas.StateOfTheGame[message.guild.id][1] += 1;

    var collectorLG;

    var loupID = dbutils.getPlaceInDb("loups", message);
    var loupChan = message.guild.channels.get(loupID);

    var charmeID = dbutils.getPlaceInDb("charmed", message);
    var charmeChan = message.guild.channels.get(charmeID);

    var vocalID = dbutils.getPlaceInDb("vocal", message);
    var vocalChan = message.guild.channels.get(vocalID);

    var townID = dbutils.getPlaceInDb("village", message);
    var village = message.guild.channels.get(townID);

    var vivantID = dbutils.getRoleInDb("vivants", message);
    var vivantRole = message.guild.roles.get(vivantID);

    datas.Listvivants[message.guild.id] = vivantRole.members.map(
      m => m.user.username
    );

    village.overwritePermissions(vivantRole, { SEND_MESSAGES: false });
    vivantRole.members.forEach(mute => {
      if (vocalChan.members.has(mute)) mute.setMute(true);
    });

    datas.vivants[message.guild.id] = "";
    for (var i = 0; i < datas.distribRoles[message.guild.id].length; i++) {
      datas.vivants[message.guild.id] +=
        "**" +
        (i + 1) +
        "**. " +
        datas.distribRoles[message.guild.id][i].User.username +
        "\n";
    }

    var rolajouer = [];
    var messNuit;

    if (
      !datas.potMort[message.guild.id] &&
      !datas.potVie[message.guild.id] &&
      datas.rolesDeNuit[message.guild.id].includes(datas.Soso[message.guild.id])
    ) {
      datas.rolesDeNuit[message.guild.id].splice(
        datas.rolesDeNuit[message.guild.id].indexOf(
          datas.Soso[message.guild.id]
        ),
        1
      );
    }

    var embed = new Discord.RichEmbed()
      .setTitle(datas.StateOfTheGame[message.guild.id].join(" "))
      .setDescription(
        "La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour."
      );
    datas.rolesDeNuit[message.guild.id].forEach(role => {
      datas.distribRoles[message.guild.id].forEach(gens => {
        if (role === gens.Role && !rolajouer.includes(gens.Role)) {
          embed.addField(gens.Role, "N'a pas encore agi");
          rolajouer.push(gens.Role);
        }
      });
    });
    message.channel.send(embed).then(function(message) {
      messNuit = message;
    });

    collector = message.channel.createCollector(filter);
    collector.on(
      "collect",
      message => {
        contenu = message.content.toLowerCase();
        var spliteMessage = contenu.split(" ");

        var embed2 = new Discord.RichEmbed()
          .setTitle(datas.StateOfTheGame[message.guild.id].join(" "))
          .setDescription(
            "La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour."
          );

        //Action nocturne des Loups Garous
        if (
          datas.IDlg[message.guild.id].includes(contenu) &&
          rolajouer.includes(datas.LG[message.guild.id])
        ) {
          datas.joueursLG[message.guild.id].forEach(joueur => {
            loupChan.overwritePermissions(joueur, { SEND_MESSAGES: true });
          });
          var PFchan;
          var pf = utils.findObjectInList(
            datas.distribRoles[message.guild.id],
            "Role",
            datas.PF[message.guild.id]
          );
          loupChan
            .send(datas.LG[message.guild.id] + " Réveillez-vous et dévorez !")
            .then(message => {
              if (pf != undefined) {
                collectorLG = message.channel.createCollector(filterLG);
                PFchan = pf.User.dmChannel;
                collectorLG.on("collect", mess => {
                  PFchan.send(
                    `**[${datas.LG[message.guild.id]}**]: ${mess.content}`
                  );
                });
              }
            });

          rolajouer.splice(rolajouer.indexOf(datas.LG[message.guild.id]), 1);
        }

        //Action nocturne du Cupidon
        else if (
          datas.IDcupi[message.guild.id].includes(contenu) &&
          rolajouer.includes(datas.Cupi[message.guild.id])
        ) {
          var item = utils.findObjectInList(
            datas.distribRoles[message.guild.id],
            "Role",
            datas.Cupi[message.guild.id]
          );
          var chan = item.User.dmChannel;

          chan.send(
            "Réveille toi, " +
              datas.Cupi[message.guild.id] +
              " ! Quels joueurs vas-tu unir par les liens indestructibles de l'amour ? \n" +
              datas.vivants[message.guild.id] +
              " \n *N'indiquez que les numéros sous la forme X-Y. Par exemple, ``1-3`` pour unir " +
              datas.distribRoles[message.guild.id][0].User.username +
              " et " +
              datas.distribRoles[message.guild.id][2].User.username +
              ".*"
          );
          var collectorLove = chan.createCollector(filter2);
          datas.eux[message.guild.id] = [];

          collectorLove.on("collect", mess => {
            var splitemess = mess.content.toLowerCase().split("-");

            if (splitemess.length === 2) {
              var Amoureux1 = parseInt(splitemess[0]);
              var Amoureux2 = parseInt(splitemess[1]);

              if (
                !isNaN(Amoureux1) &&
                !isNaN(Amoureux2) &&
                0 < Amoureux1 &&
                Amoureux1 <= datas.Listvivants[message.guild.id].length &&
                0 < Amoureux2 &&
                Amoureux2 <= datas.Listvivants[message.guild.id].length
              ) {
                datas.eux[message.guild.id].push(
                  datas.distribRoles[message.guild.id][Amoureux1 - 1]
                );
                datas.eux[message.guild.id].push(
                  datas.distribRoles[message.guild.id][Amoureux2 - 1]
                );
                datas.Lovers[message.guild.id] = datas.eux[message.guild.id];
                chan.send(
                  "C'est fait. " +
                    datas.eux[message.guild.id][0].User.username +
                    " et " +
                    datas.eux[message.guild.id][1].User.username +
                    " sont désormais liés pour la vie... et la mort."
                );
                datas.salonLog[message.guild.id].send(
                  "Les amoureux sont : " +
                    datas.eux[message.guild.id][1].User.username +
                    " et " +
                    datas.eux[message.guild.id][0].User.username +
                    "."
                );
                var amour = themeuh.amour.OnLove.split("|");
                var chan2 = datas.eux[message.guild.id][0].User.dmChannel;
                chan2.send(
                  amour[0] +
                    datas.eux[message.guild.id][1].User.username +
                    amour[1]
                );
                var chan3 = datas.eux[message.guild.id][1].User.dmChannel;
                chan3.send(
                  amour[0] +
                    datas.eux[message.guild.id][0].User.username +
                    amour[1]
                );
                datas.eux[message.guild.id] = [];
                collectorLove.stop();
              } else {
                mess.channel.send(
                  "Woof ! Je ne  comprends pas ``" +
                    mess +
                    "``. Il faut écrire par exemple ``1-3``."
                );
              }
            } else {
              mess.channel.send(
                "Woof ! Je ne  comprends pas ``" +
                  mess +
                  "``. Il faut écrire par exemple ``1-3``, sans autre caractère."
              );
            }
          });
          datas.rolesDeNuit[message.guild.id].splice(
            datas.rolesDeNuit[message.guild.id].indexOf(
              datas.Cupi[message.guild.id]
            ),
            1
          );
          rolajouer.splice(rolajouer.indexOf(datas.Cupi[message.guild.id]), 1);
        }

        //Action nocturne de la Voyante
        else if (
          datas.IDvovo[message.guild.id].includes(contenu) &&
          rolajouer.includes(datas.Vovo[message.guild.id])
        ) {
          rolajouer.splice(rolajouer.indexOf(datas.Vovo[message.guild.id]), 1);
          var item = utils.findObjectInList(
            datas.distribRoles[message.guild.id],
            "Role",
            datas.Vovo[message.guild.id]
          );

          var chan = item.User.dmChannel;
          chan.send(
            "Réveille toi, " +
              datas.Vovo[message.guild.id] +
              " ! De quel joueur veux-tu connaître le rôle cette nuit ? \n" +
              datas.vivants[message.guild.id] +
              "*N'indiquez que le numéro du joueur, par exemple ``1`` pour voir le rôle de " +
              datas.distribRoles[message.guild.id][0].User.username +
              ".*"
          );
          collector2 = chan.createCollector(filter2);
          collector2.on("collect", mess => {
            var cible = parseInt(mess);
            var lui = [];
            if (
              !isNaN(cible) &&
              0 < cible &&
              cible <= datas.Listvivants[message.guild.id].length
            ) {
              lui.push(datas.distribRoles[message.guild.id][cible - 1]);
              mess.channel.send(
                lui[0].User.username + " est **" + lui[0].Role + "**!"
              );
              logs.send(
                item.User +
                  " a observé le joueur " +
                  lui[0].User +
                  ", qui est " +
                  lui[0].Role
              );
              collector2.stop();
            } else {
              mess.channel.send(
                "Woof ! Merci d'indiquer un chiffre parmi ceux proposés ! "
              );
            }
          });
        }

        //Action nocture de la Sorcière
        else if (
          datas.IDsoso[message.guild.id].includes(spliteMessage[0]) &&
          rolajouer.includes(datas.Soso[message.guild.id])
        ) {
          //On s'attend à ce que le MJ indique en plus la victime des loups garous
          if (spliteMessage.length != 2) {
            //S'il ne l'a pas fait, on l'invite à le faire
            message.reply("Quel est la victime de la nuit ?");
          } else {
            //Sinon, tout va bien, on prend comme victime le membre mentionné
            rolajouer.splice(
              rolajouer.indexOf(datas.Soso[message.guild.id]),
              1
            );
            var previct = message.guild.member(message.mentions.users.first());
            //Si previct contient une valeur et non pas "personne"
            if (spliteMessage[1] != "personne" && previct != null) {
              //La victime est désignée par son nom d'utilisateur
              datas.victime[message.guild.id] = previct.user.username;
            } else {
              //Sinon, c'est personne
              datas.victime[message.guild.id] = " personne !";
            }
            var item = utils.findObjectInList(
              datas.distribRoles[message.guild.id],
              "Role",
              datas.Soso[message.guild.id]
            );
            var chan = item.User.dmChannel;
            var pots = "";
            var info = "";
            if (datas.potVie[message.guild.id]) {
              info =
                "La victime des " +
                datas.LG[message.guild.id] +
                " ce soir est **" +
                datas.victime[message.guild.id] +
                "**, _veux tu la sauver ?_";
              if (datas.potMort[message.guild.id]) {
                pots = themeuh.potions.Vie + " et " + themeuh.potions.Mort;
              } else {
                pots = themeuh.potions.Vie;
              }
            } else if (
              datas.potMort[message.guild.id] &&
              !datas.potVie[message.guild.id]
            ) {
              pots = themeuh.potions.Mort;
            }
            chan
              .send(
                "Réveille toi, " +
                  datas.Soso[message.guild.id] +
                  " ! " +
                  info +
                  "\n Il te reste " +
                  pots +
                  "."
              )
              .then(function(mess) {
                if (datas.potVie[message.guild.id]) {
                  datas.ConfSoso[message.guild.id] = mess;
                  mess.react("✅");
                  mess.react("❌");
                  var collectorSoso = mess.createReactionCollector(filterSoso);
                  collectorSoso.on("collect", reac => {
                    if (
                      datas.potVie[message.guild.id] &&
                      !datas.next[message.guild.id] &&
                      reac.count > 1
                    ) {
                      if (reac.emoji.name === "❌") {
                        reac.message.channel.send(
                          "Très bien. **" +
                            datas.victime[message.guild.id] +
                            "** mourra."
                        );
                        datas.salonLog[message.guild.id].send(
                          datas.Soso[message.guild.id] +
                            " n'a protégé personne."
                        );
                        datas.next[message.guild.id] = true;
                        collectorSoso.stop();
                      } else if (reac.emoji.name === "✅") {
                        var sauvetage = themeuh.potions.Save.split("|");
                        reac.message.channel.send(
                          sauvetage[0] +
                            datas.victime[message.guild.id] +
                            sauvetage[1]
                        );
                        datas.salonLog[message.guild.id].send(
                          datas.Soso[message.guild.id] +
                            " a protégé **" +
                            datas.victime[message.guild.id] +
                            "**, qui ne mourra pas cette nuit."
                        );
                        datas.next[message.guild.id] = true;
                        datas.potVie[message.guild.id] = false;
                        collectorSoso.stop();
                      } else {
                        console.log(reac.emoji.name);
                      }
                    }
                  });
                  collectorSoso.on("end", c => {
                    nightUtils.UsePotMort(mess, message.guild, themeuh);
                  });
                } else nightUtils.UsePotMort(mess, message.guild, themeuh);
              });
          }
        }

        //Action nocturne du Salvateur
        else if (
          datas.IDsalva[message.guild.id].includes(contenu) &&
          rolajouer.includes(datas.Salva[message.guild.id])
        ) {
          var item = utils.findObjectInList(
            datas.distribRoles[message.guild.id],
            "Role",
            datas.Salva[message.guild.id]
          );
          var chan = item.User.dmChannel;
          rolajouer.splice(rolajouer.indexOf(datas.Salva[message.guild.id]), 1);

          chan.send(
            "Réveille toi, " +
              datas.Salva[message.guild.id] +
              " ! Qui vas-tu protéger cette nuit ? \n" +
              datas.vivants[message.guild.id] +
              "*N'indiquez que le numéro du joueur, par exemple ``1`` pour protéger " +
              datas.distribRoles[message.guild.id][0].User.username +
              ".*"
          );
          collector2 = chan.createCollector(filter2);
          collector2.on("collect", mess => {
            var cible = parseInt(mess);
            var lui = [];
            if (
              !isNaN(cible) &&
              0 < cible &&
              cible <= datas.Listvivants[message.guild.id].length
            ) {
              lui.push(datas.distribRoles[message.guild.id][cible - 1]);
              mess.channel.send(
                "**" +
                  lui[0].User.username +
                  "** est protégé cette nuit. Aucun " +
                  datas.LG[message.guild.id] +
                  " ne pourra lui faire du mal."
              );
              logs.send(item.User + " a protégé le joueur " + lui[0].User);
              collector2.stop();
            } else {
              mess.channel.send(
                "Woof ! Merci d'indiquer un chiffre parmi ceux proposés ! "
              );
            }
          });
        }

        //Action nocturne du Joueur de flûte
        else if (
          datas.IDjdf[message.guild.id].includes(contenu) &&
          rolajouer.includes(datas.JDF[message.guild.id])
        ) {
          var item = utils.findObjectInList(
            datas.distribRoles[message.guild.id],
            "Role",
            datas.JDF[message.guild.id]
          );
          var chan = item.User.dmChannel;
          var acharme = [];
          var acharmer = "";
          var welcome = themeuh.flute.Welcome.split("|");
          var distribTemp = [];
          if (datas.charmes[message.guild.id].length === 0) {
            datas.charmes[message.guild.id].push(item.GuildMember);
            datas.distribRoles[message.guild.id].forEach(role => {
              if (role != item) distribTemp.push(role);
            });
          }
          datas.charmes[message.guild.id].forEach(charme => {
            datas.distribRoles[message.guild.id].forEach(vivant => {
              if (vivant.User.username != charme.user.username) {
                acharme.push(vivant.User.username);
              }
            });
          });
          if (acharme[0] === undefined) {
            for (
              var i = 0;
              i < datas.distribRoles[message.guild.id].length;
              i++
            ) {
              acharme.push(
                datas.distribRoles[message.guild.id][i].User.username
              );
            }
          }
          for (var i = 0; i < acharme.length; i++) {
            acharmer += "**" + (i + 1) + "**. " + acharme[i] + "\n";
          }

          chan.send(
            "Réveille toi, " +
              datas.JDF[message.guild.id] +
              welcome[0] +
              " \n" +
              acharmer +
              "*N'indiquez que les numéros sous la forme X-Y. Par exemple, ``1-2`` pour " +
              welcome[1] +
              acharme[0] +
              " et " +
              acharme[1] +
              ". Si vous ne souhaitez " +
              welcome[1] +
              " qu'une personne, écrivez sous la forme ``X-0``. Si vous ne souhaitez " +
              welcome[1] +
              " personne, écrivez ``0``. \n (Attention, si jamais vous écrivez ``0-X`` par exemple, personne ne sera " +
              welcome[2] +
              ".)*"
          );

          collector2 = chan.createCollector(filter2);
          collector2.on("collect", mess => {
            if (mess[0] == "0") {
              mess.channel.send(
                "Personne ne sera " + welcome[1] + " cette nuit."
              );
              datas.salonLog[message.guild.id].send(
                item[2] + " n'a " + welcome[1] + " personne cette nuit."
              );
              collector2.stop();
            }
            var splitemess = mess.content.split("-");
            var cible1 = parseInt(splitemess[0]);
            var cible2 = parseInt(splitemess[1]);
            var eux = [];
            if (
              !isNaN(cible1) &&
              !isNaN(cible2) &&
              0 < cible1 &&
              cible1 <= acharme.length &&
              0 <= cible2 &&
              cible2 <= acharme.length
            ) {
              eux.push(distribTemp[cible1 - 1]);
              var eux2 = "c'est tout";
              if (cible2 != 0) eux2 = distribTemp[cible2 - 1].User.username;
              mess.channel.send(
                "**" +
                  eux[0].User.username +
                  "** et **" +
                  eux2 +
                  themeuh.flute.Charme
              );
              logs.send(
                item[2] +
                  " a " +
                  welcome[2] +
                  " les joueurs " +
                  eux[0].User.username +
                  " et " +
                  eux2
              );
              nightUtils.Charme(message, eux[0].GuildMember, welcome);
              if (cible2 != 0)
                nightUtils.Charme(
                  message,
                  distribTemp[cible2 - 1].GuildMember,
                  welcome
                );
              collector2.stop();
            } else {
              mess.channel.send(
                "Woof ! Merci d'indiquer un chiffre parmi ceux proposés ! "
              );
            }
          });
          rolajouer.splice(rolajouer.indexOf(datas.JDF[message.guild.id]), 1);
        }

        message.delete();
        rolajouer.forEach(role => {
          embed2.addField(role, "N'a pas encore agi");
        });
        if (rolajouer.length === 0) {
          embed2.addField(
            "Nuit terminée",
            "Tous les rôles ont étés appelés, s'ils ont tous répondu, la nuit peut s'achever."
          );
          collector.stop();
        }

        messNuit.edit(embed2);
      },
      36000
    );
    collector.on("end", collected => {
      message.channel.send("Collecteur terminé.");
      datas.joueursLG[message.guild.id].forEach(joueur => {
        loupChan.overwritePermissions(joueur, { SEND_MESSAGES: false });
      });
      if (collectorLG != undefined) {
        collectorLG.stop();
      }
    });
  }
};
