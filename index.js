//TODO :
//Le collecteur de la nuit derp : on est au courant
//Rajouter une image au début du jour avec les joueurs vivants & morts (sous forme de tombe) avec pseudos : c'pas demain la veille
//Permettre une configuration personnalisée
//LE SITE
//Système de leveling

//TODO URGENT :
//Le bot donne plus accès à la tanière :> strange
//Soso marche plus la deuxième fois
//votes foireux :> ok theory

//TODO Thèmes :
//Star Wars
//Epithet Erased

//Notice pour rajouter un rôle :
//- Rajouter sa logique d'action dans la commande  'nuit'
//- Rajouter son ID et son nom
//- Le rajouter dans RolesDeNuit s'il agit la nuit

const Discord = require("discord.js");
const Embed = require("./src/commands/embeds");
const Embeds = new Embed();
const bot = new Discord.Client();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const express = require("express");
const PORT = process.env.PORT || 5000;
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const Theme = require("./themes/Themes.js");
const Role = require("./themes/Role.js");
const Presets = require("./themes/Presets.json")
const Enmap = require("enmap");
const fs = require("fs");
const global = require("./src/global.js");
const auth = require("./src/auth.js");



express().listen(PORT);

function Activity() {
  actif = setInterval(function () {
    console.log("ping");
  }, 540000);
}

const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;
bot.config = config;


fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./src/events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./src/events/${file}`)];
  });
});

bot.commands = new Enmap();

fs.readdir("./src/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(file.toString())
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./src/commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    bot.commands.set(commandName, props);
  });
});


db.defaults({ administrateurs: [] }).write();
db.defaults({ ministrateurs: [] }).write();
db.defaults({ salons: [] }).write();
db.defaults({ roles: [] }).write();

comp.defaults({ composition: [] }).write();

bot.on("ready", () => {
  Activity();
  for (const guild of bot.guilds.values()) {
    global.init(guild.id);
  }
  console.log("GRAOU est prêt!");
});

bot.login(token);



bot.on("guildCreate", guild => {
  admin = "<@" + guild.owner.id + ">";
  var number = db
    .get("ministrateurs")
    .map("id")
    .value().length;
  db.get("ministrateurs")
    .push({ guild: guild.id, id: number, story_value: admin })
    .write();
  init(guild.id);
  guild.owner.createDM().then(channel => {
    channel.send(
      "Bonjour et merci de m'avoir ajouté à **" +
      guild.name +
      "** ! Vous pouvez utiliser la configuration automatique avec `/config auto` ou configurer les salons et rôles nécessaires en suivant _le manuel d'utilisation_. \n Vous pouvez également ajouter d'autres utilisateurs afin qu'ils puissent masteriser des parties en utilisant `/defadminhere [@user]`. \n Pour connaître la liste des commandes disponibles, utilisez la commande `/help` (vous ne verrez l'intégralité des commandes que sur votre serveur)."
    );
  });
});

bot.on("message", message => {
  try {
    if (message.content[0] === prefix) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      const filter = m =>
        m.author === message.author || adminlist.includes(m.author);
      const filter2 = m => inscrits[message.guild.id].includes(m.author.id);
      const filterSoso = reac =>
        reac.emoji.name === "✅" || reac.emoji.name === "❌";
      const filterLG = m => joueursLG[message.guild.id].includes(m.author)
      var lowercase = message.content.toLowerCase();
      let spliteMessage = lowercase.split(" ");

      if (message.channel.type != "dm") {
        getPlaceInDb("logs", message);
        logs = message.guild.channels.get(lieuDB[message.guild.id]);
        salonLog[message.guild.id] = logs;
        mini[message.guild.id] = false;
        global.Auth(message);
        console.log(global.mini[message.guild.id])


        /*if (spliteMessage[0] === prefix + "ping") {
          if (adminlist.includes(message.author)) {
            message.reply("Pong ! \n *Rang de l'utilisateur : Propriétaire.*");
          } else if (mini[message.guild.id]) {
            message.reply("Pong ! \n *Rang de l'utilisateur : Administrateur local.*");
          } else {
            message.reply("Pong.");
          }
        }*/

        //initialisation des rôles admins
        if (
          spliteMessage[0] == prefix + "defadmin" &&
          spliteMessage[1] != null
        )
          return;

        //supprime le membre mentionné des administrateurs
        else if (
          spliteMessage[0] == prefix + "supadmin" &&
          spliteMessage[1] != null
        ) {
          return;
        }
        //initialisation des rôles admins sur un serveur unique
        else if (
          spliteMessage[0] == prefix + "defadminhere" &&
          spliteMessage[1] != null
        ) {
          return;
        }

        //supprime le membre mentionné des administrateurs d'un serveur unique
        else if (
          spliteMessage[0] == prefix + "supadminhere" &&
          spliteMessage[1] != null
        ) {
          return;
        }

        //fait durer le bot
        else if (spliteMessage[0] === prefix + "eco") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            message.delete();
            message.channel
              .send("Le bot s'endormira après 30 minutes d'inactivité.")
              .then(message =>
                setTimeout(function () {
                  message.delete();
                }, 4000)
              );
            clearInterval(actif);
          }
        }

        //initialistion des rôles
        else if (spliteMessage[0] == prefix + "addrole") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          )
            return;
        }

        //suppression du rôle
        else if (spliteMessage[0] == prefix + "supprole") {
          return;
        }
        //initialistion des lieux
        else if (spliteMessage[0] == prefix + "addsalon") {
          //Vérification que l'auteur est administrateur, au moins local
          return
        }

        //suppression du lieu
        else if (spliteMessage[0] == prefix + "suppsalon") {
          return;
        }

        //configuration du serveur
        else if (spliteMessage[0] == prefix + "config") {
          return;
        }

        //inscription
        else if (spliteMessage[0] === prefix + "inscription") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {

          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent lancer les parties."
            );
          }
        }

        //lancer la partie
        else if (spliteMessage[0] == prefix + "gamestart") {
          message.delete();
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            if (gameOn[message.guild.id] === false) {
              gameOn[message.guild.id] = true;
              message.channel.send("Partie lancée, bon appétit !");
            } else {
              message.reply("Erreur, la partie est déjà lancée.");
            }
          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent lancer les parties."
            );
          }
        } 
        
        else if (spliteMessage[0] == prefix + "win") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            if (spliteMessage[1] != null) {
              var victoire = "**VICTORIEUX** 👑";
              var defaite = "Perdant";
              var villageois = Presets[theme[message.guild.id]].villageois
              var amoureux = Presets[theme[message.guild.id]].amour.Amoureux
              var jdf = findObjectInList(Presets[theme[message.guild.id]].roles, "Title", "Joueur De Flûte")

              if (IDlg[message.guild.id].includes(spliteMessage[1])) {
                distribRoles[message.guild.id].forEach(role => {
                  if (role.Role == LG[message.guild.id]) {
                    role.Victoire = victoire
                  } else {
                    role.Victoire = defaite;
                  }
                });
                win[message.guild.id] = LG[message.guild.id];
                message.channel.send(
                  `La victoire revient aux **${LG[message.guild.id]}** !`
                );
              } else if (spliteMessage[1] === "village") {
                distribRoles[message.guild.id].forEach(role => {
                  if (role.Role != LG[message.guild.id] && role.Role != JDF[message.guild.id]) {
                    role.Victoire = victoire
                  } else {
                    role.Victoire = defaite;
                  }
                });
                win[message.guild.id] = villageois;
                message.channel.send(`La victoire revient aux **${villageois}** !`);
              }
              else if (spliteMessage[1] === "amoureux") {
                distribRoles[message.guild.id].forEach(role => {
                  if (Lovers[message.guild.id].includes(role)) {
                    role.Victoire = victoire
                  } else {
                    role.Victoire = defaite;
                  }
                });

                win[message.guild.id] = amoureux;
                message.channel.send(`La victoire revient aux **${amoureux}** !`);
              } else if (IDjdf[message.guild.id].includes(spliteMessage[1])) {
                distribRoles[message.guild.id].forEach(role => {
                  if (role.Role === JDF[message.guild.id]) {
                    role.Victoire = victoire
                  } else {
                    role.Victoire = defaite;
                  }
                });

                win[message.guild.id] = jdf.Name;
                message.channel.send(
                  `La victoire revient au **${jdf.Name}** !`
                );
              } else {
                message.reply(
                  "Je n'ai pas compris " + spliteMessage[1] + ". Qui a gagné ?"
                );
              }
            } else {
              message.reply("Je n'ai pas compris, qui a gagné ?");
            }
          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent déclarer une victoire."
            );
          }
        }

        //termine la partie
        else if (spliteMessage[0] == prefix + "gamend") {
          message.delete();
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            getPlaceInDb("loups", message);
            lieu = message.guild.channels.get(lieuDB[message.guild.id]);

            getRoleInDb("vivants", message);
            role = message.guild.roles.get(roleDB[message.guild.id]);

            getPlaceInDb("charmed", message);
            lieu2 = message.guild.channels.get(lieuDB[message.guild.id]);

            getPlaceInDb("village", message);
            village = message.guild.channels.get(lieuDB[message.guild.id]);

            if ((win[message.guild.id] != null)) Recap(village);
            else
              message.channel.send(
                "La victoire n'a pas été déclarée, le récapitulatif de la partie ne sera pas affiché."
              );
            reviveAll(message);
            unmute(role, message);

            setTimeout(() => {
              getRoleInDb("vivants", message);
              var role2 = message.guild.roles
                .get(roleDB[message.guild.id])
                .members.map(m => m.user);
              role2.forEach(vivant => {
                lieu.overwritePermissions(vivant, {
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false
                });
                lieu2.overwritePermissions(vivant, {
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false
                });
              });
            }, 3000);

            charmes[message.guild.id] = [];
            if (messCompo[message.guild.id] != null) {
              messCompo[message.guild.id].unpin();
            }
            init(message.guild)

            console.log(gameOn[message.guild.id]);
            gameOn[message.guild.id] = false;

            clearInterval(x[message.guild.id]);
            clearTimeout(y[message.guild.id]);
            clearTimeout(z[message.guild.id]);

            message.channel.send("Partie terminée, merci d'avoir joué !");
          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent terminer les parties."
            );
          }
        }

        //termine la session
        else if (spliteMessage[0] == prefix + "allend") {
          message.delete();
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            reviveAll(message);

            gameOn[message.guild.id] = false;
            getRoleInDb("vivants", message);
            role = roleDB[message.guild.id];

            getPlaceInDb("vocal", message);
            lieu = lieuDB[message.guild.id];

            getPlaceInDb("general", message);
            lieu2 = lieuDB[message.guild.id];

            eux[message.guild.id] = message.guild.roles.get(role).members;
            if (lieu2 === lieu) {
              message.channel.send(
                "Session terminée, merci d'avoir joué ! A la prochaine fois !"
              );
            } else {
              message.channel.send(
                "Session terminée, merci d'avoir joué ! Les participants seront déplacés dans le salon vocal général d'ici 3 secondes..."
              );
              blep = setTimeout(function () {
                eux[message.guild.id].forEach(lui => {
                  if (lieu.members.includes(lui))
                    lui.setVoiceChannel(lieu2);
                  lui.removeRole(role);
                });
              }, 3000);
            }
          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent terminer les sessions."
            );
          }
        }

        //clear le channel - admin
        else if (spliteMessage[0] === prefix + "clear") {
          return;
        }

        //Mute (vocal) la personne mentionnée
        else if (spliteMessage[0] === prefix + "mute") {
          return;
        }

        //Unmute (vocal) la personne mentionnée
        else if (spliteMessage[0] === prefix + "unmute") {
          return;
        }

        //check qui sont les admins
        else if (spliteMessage[0] == prefix + "checkadmin") {
          message.reply(
            "Les administrateurs sont " +
            db
              .get("administrateurs")
              .map("story_value")
              .value()
          );
        }
        //Retourne les identifiants reconnus
        else if (spliteMessage[0] == prefix + "checkid") {
          if (spliteMessage[1] === "admin") {
            message.channel.send(
              "Liste de tous les IDs : \n" + identifiers.toString()
            );
            message.delete();
          } else {
            message.reply(
              "Les identifiants reconnus sont \n - vivants : le rôle des joueurs vivants \n - morts : le rôle des joueurs morts \n - village : le salon de discussion de jour \n - votes : le salon des votes"
            );
          }
        }

        // Tue le joueur mentionné.
        else if (spliteMessage[0] === prefix + "kill") {
          return;
        } 
        
        else if (spliteMessage[0] === prefix + "revive") {
          return;
        }

        //Revive de masse
        else if (spliteMessage[0] == prefix + "reviveall") {
          message.delete();
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            reviveAll(message);
          } else {
            message.reply(
              "commande refusée. Seuls les administrateurs peuvent lancer les parties."
            );
          }
        }
        //Mise en place des votes
        else if (spliteMessage[0] === prefix + "vote") {
          return;
        }

        //Commence la journée
        else if (spliteMessage[0] === prefix + "daystart") {
         return;
        }

        //prolongations
        else if (spliteMessage[0] === prefix + "prolong") {
          return;
        }

        //Achève la journée
        else if (spliteMessage[0] === prefix + "dayend") {
          return;
        }

        //Annonce une commande de nuit
        else if (spliteMessage[0] === prefix + "nuit") {
          return;
        }

        //Détermine un rôle pour la prochaine partie
        else if (spliteMessage[0] === prefix + "theme") {
          if (adminlist.includes(message.author) || mini[message.guild.id]) {
            message.delete();
            if (!gameOn[message.guild.id]) {
              if (spliteMessage[1] != null) {
                if (Presets[spliteMessage[1]] != undefined) {
                  theme[message.guild.id] = spliteMessage[1];
                  message.channel.send("Thème de la prochaine partie : " + spliteMessage[1]);
                }
                else {
                  message.reply("Merci d'indiquer un thème valide")
                }
              }
              else {
                message.reply("Merci de préciser le thème désiré !")
              }
            }
            else {
              message.reply("Impossible de changer le thème lorsqu'une partie est en cours !")
            }
          }
          else {
            message.reply("Seuls les administrateurs peuvent déterminer le thème de la prochaine partie.")
          }
        }

        //Prépare la composition de la partie
        else if (spliteMessage[0] === prefix + "compo") {
          
          return;
        }

        //Envoie les rôles à tous les inscrits
        else if (spliteMessage[0] === prefix + "distribution") {
          return;
        } 
        
        else if (spliteMessage[0] === prefix + "charme") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            if (spliteMessage.length <= 2) {
              message.delete();
              let lui = message.guild.member(message.mentions.users.first());
              if (lui === null) {
                message.reply("Veuillez mentionner un utilisateur valide.");
              } else {
                getPlaceInDb("charmed", message);
                lieu = lieuDB[message.guild.id];

                message.guild.channels.get(lieu).overwritePermissions(lui, {
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: false
                });
                message.guild.channels
                  .get(lieu)
                  .send(lui + " vient de se faire charmer !");
                charmes[message.guild.id].push(lui);
              }
            } else {
              message.delete();
              message.channel.send(
                "Formulation incorrecte. La bonne syntaxe est ``/charme @[utilisateur]``"
              );
            }
          } else {
            message.delete();
            message.reply(
              "Désolé, cette commande est réservée aux maîtres du jeu."
            );
          }
        } else if (spliteMessage[0] === prefix + "decharme") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            if (spliteMessage.length <= 2) {
              message.delete();
              let lui = message.guild.member(message.mentions.users.first());
              if (lui === null) {
                message.reply("Veuillez mentionner un utilisateur valide.");
              } else {
                getPlaceInDb("charmed", message);
                lieu = lieuDB[message.guild.id];

                message.guild.channels.get(lieu).overwritePermissions(lui, {
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false
                });
                charmes[message.guild.id].splice(charmes.indexOf(lui), 1);
              }
            } else {
              message.delete();
              message.channel.send(
                "Formulation incorrecte. La bonne syntaxe est ``/decharme @[utilisateur]``"
              );
            }
          } else {
            message.delete();
            message.reply(
              "Désolé, cette commande est réservée aux maîtres du jeu."
            );
          }
        }

        //arrête toutes les actions en cours
        else if (spliteMessage[0] === prefix + "stop") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            message.delete();
            clearInterval(x[message.guild.id]);
            clearTimeout(y[message.guild.id]);
            clearTimeout(z[message.guild.id]);
            message.channel.send(
              "Tous les décomptes ont été interrompus."
            );
          }
        }

        //Casse le bot
        else if (spliteMessage[0] === prefix + "break") {
          if (
            adminlist.includes(message.author) ||
            mini[message.guild.id] === true
          ) {
            message.delete();
            message.guild.members.removeRole("27");
          } else {
            message.delete();
            message.reply(
              "Désolé, cette commande est réservée aux maîtres du jeu."
            );
          }
        }
      }
      //aide sur les rôles
      if (spliteMessage[0] === prefix + "ask") {
        spliteMessage.splice(0, 1);
        var contenu = spliteMessage.join(" ");
        sendHelp();
        function sendHelp() {
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
        }
      }
      //aide générale
      else if (spliteMessage[0] === prefix + "help") {
        if (mini[message.guild.id] || adminlist.includes(message.author)) {
          if (message.channel.type === "dm") {
            message.channel.send("Utilisez cette commande dans un serveur pour avoir la liste des commandes que vous pouvez utiliser sur ce serveur.")
          }
          var lui = message.author;
          helpGen(message, lui);
        }
      }

      //Suggestions
      else if (spliteMessage[0] === prefix + "suggestion") {
        spliteMessage.splice(0, 1)
        var contenu = spliteMessage.join(" ");
        bot.fetchUser("218701822670405633").then(moi => {
          var embed = new Discord.RichEmbed()
            .setTitle("Nouvelle suggestion")
            .setDescription("Suggestion de " + message.author.tag)
            .setThumbnail(message.author.avatarURL)
            .addField("Suggestion :", contenu)
            .setFooter("Suggestion faite le " + message.createdAt)
          moi.createDM().then(channel => {
            channel.send(embed);
          })
        })


      }
    }
  } catch (e) {
    message.reply(e.message);
    console.error(e);
  }
});

bot.on("messageReactionAdd", (reac, lui) => {
  try {
    if (reac.message.channel.type != "dm") {
      if (reac.message === inscr[reac.message.guild.id]) {
        getRoleInDb("vivants", reac.message);
        rolevivant = roleDB[reac.message.guild.id];
        if (gameOn[reac.message.guild.id] === false) {
          //Si on a atteint le maximum d'inscriptions
          if (reac.count > maxP[reac.message.guild.id] + 1) {
            reac.remove(lui);
            lui.createDM().then(channel => {
              channel.send(
                "Inscription refusée, la partie est déjà complète. Essaie la prochaine !"
              );
            });
          } else {
            //Sinon, et en ignorant la première réaction (celle du bot)
            if (reac.count > 1) {
              inscrits[reac.message.guild.id].push(lui.id);
              reac.message.guild.members.get(lui.id).addRole(rolevivant);
              inscrep[reac.message.guild.id].push(lui);

              reac.message.edit(
                new Discord.RichEmbed()
                  .setTitle("Inscriptions pour les parties de loup Garou")
                  .setDescription(
                    "Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
                    maxP[reac.message.guild.id] +
                    "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
                  )
                  .addField(
                    "Joueurs inscrits :",
                    inscrep[reac.message.guild.id]
                  )
              );
            }
          }
        } else {
          lui.createDM().then(channel => {
            reac.remove(lui);
            channel.send(
              "Une partie est déjà en cours, il est impossible de s'inscrire !"
            );
          });
        }

      } else if (votes[reac.message.guild.id].includes(reac.message)) {
        //Vérifie que celui qui vote est bien vivant et que c'est un vote du jour


        getRoleInDb("vivants", reac.message);
        rolevivant = roleDB[reac.message.guild.id];
        if (!lui.bot) {
          var item = findObjectInList(distribRoles[reac.message.guild.id], "GuildMember", lui)
          var luiroles = reac.message.guild.members
            .get(lui.id)
            .roles.map(r => r.id);
          if (banniDeVote[reac.message.guild.id].includes(item)) {
            avote[reac.message.guild.id].push(item.User)
          }
          if (
            luiroles.includes(rolevivant) &&
            votedejour[reac.message.guild.id]
          ) {
            if (!avote[reac.message.guild.id].includes(lui)) {
              avote[reac.message.guild.id].push(lui);
            } else {
              avote[reac.message.guild.id].push(lui);
              reac.remove(lui);
            }
            var membre = reac.message.content.split("<@!");
            if (membre[1] === undefined)
              membre = reac.message.content.split("<@")
            membre = membre[1].split(">")
            var item2 = findObjectInList(voted[reac.message.guild.id], "contenu", reac.message.guild.members.get(membre[0]))
            item2.votes += 1;
          } else {
            if (votedejour[reac.message.guild.id]) {
              reac.remove(lui);
            }
          }
        }
      }
    }
  } catch (e) {
    reac.message.reply(e.message);
    console.log(e);
  }
});

bot.on("messageReactionRemove", (reac, lui) => {
  try {
    if (reac.message.channel.type != "dm") {
      if (reac.message === inscr[reac.message.guild.id]) {
        getRoleInDb("vivants", reac.message);
        role = roleDB[reac.message.guild.id];
        if (inscrep[reac.message.guild.id].includes(lui)) {
          inscrep[reac.message.guild.id].splice(
            inscrep[reac.message.guild.id].indexOf(lui),
            1
          );
          inscrits[reac.message.guild.id].splice(
            inscrits[reac.message.guild.id].indexOf(lui.id),
            1
          );
          reac.message.guild.members.get(lui.id).removeRole(role);
          reac.message.edit(
            new Discord.RichEmbed()
              .setTitle("Inscriptions pour les parties de loup Garou")
              .setDescription(
                "Inscrivez  -vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
                maxP[reac.message.guild.id] +
                "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
              )
              .addField(
                "Joueurs inscrits :",
                "." + inscrep[reac.message.guild.id]
              )
          );
        }
      } else if (votes[reac.message.guild.id].includes(reac.message)) {
        if (avote[reac.message.guild.id].includes(lui)) {
          avote[reac.message.guild.id].splice(
            avote[reac.message.guild.id].indexOf(lui),
            1
          );
          var item = findObjectInList(voted[reac.message.guild.id], "contenu", reac.message.content)
          item.votes -= 1;
        }
      }
    }
  } catch (e) {
    reac.message.channel.send(
      e.message + "\n A ```" + reac.message.content + "```."
    );
  }
});

function UsePotMort(){
  return;
}




function Charme(){
  return;
}

function reviveAll(message) {
  getRoleInDb("morts", message);
  role = roleDB[message.guild.id];
  getPlaceInDb("vocal", message);
  vocal = lieuDB[message.guild.id];

  eux = message.guild.roles.get(role).members;
  eux.forEach(lui => {
    setTimeout(() => {
      getRoleInDb("vivants", message);
      role2 = roleDB[message.guild.id];
      lui.addRole(role2);
    }, 500);
    if (vocal.members.includes(lui))
      lui.setMute(false);
    //Retirer le rôle en deuxième pour éviter de déco les joueurs portable
    setTimeout(() => {
      lui.removeRole(role);
    }, 1000);
  });
  console.log("Réussite du reviveall");
}

function mute(role, message) {
  return;
}

function unmute(role, message) {
  
}



function Kill(message, lui) {
  getRoleInDb("vivants", message);
  role = roleDB[message.guild.id];
  setTimeout(() => {
    getRoleInDb("morts", message);
    role2 = roleDB[message.guild.id];
    lui.addRole(role2);
  }, 500);

  setTimeout(() => {
    lui.removeRole(role);
  }, 3000);
  getPlaceInDb("village", message);
  lieu = lieuDB[message.guild.id];

  getPlaceInDb("vocal", message);
  vocal = lieuDB[message.guild.id];

  var item = findObjectInList(distribRoles[message.guild.id], "GuildMember", lui)
  if (item != undefined) {
    if (charmes[message.guild.id] != undefined)
      charmes[message.guild.id].splice(charmes[message.guild.id].indexOf(item.GuildMember), 1);

    rolmort = ", il/elle était " + item.Role + ".";
    distribRolMorts[message.guild.id].push(item);
    distribRoles[message.guild.id].splice(
      distribRoles[message.guild.id].indexOf(item),
      1
    );
  } else {
    rolmort = ".";
  }

  if (vocal.members.inclduess(lui))
    lui.setMute(true);
  message.guild.channels.get(lieu).send(lui + " est mort" + rolmort);
  getPlaceInDb("charmed", message);
  lieu2 = lieuDB[message.guild.id];

  message.guild.channels
    .get(lieu2)
    .overwritePermissions(lui, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

  if (joueursLG[message.guild.id].includes(lui)) {
    getPlaceInDb("loups", message)
    lieu3 = lieuDB[message.guild.id];
    message.guild.channels.get(lieu3).overwrittePermissions(lui, { SEND_MESSAGES: false });
  }

  if (Lovers[message.guild.id].includes(item)) {
    var dead = Presets[theme[message.guild.id]].amour.OnDeath.split("|")
    Lovers[message.guild.id].splice(Lovers[message.guild.id].indexOf(item), 1);
    message.guild.channels
      .get(lieu)
      .send(
        dead[0] +
        Lovers[message.guild.id][0].User +
        dead[1]
      ).then(mess => {
        var amorreux = Lovers[message.guild.id][0].GuildMember;
        Lovers[message.guild.id] = [];
        Kill(mess, amorreux);
      })
  }
}

function endVote(){
  return;
}

function deathBE(message, item) {
  return
}

function voteJour(message, egalite = null) {
  return;
}

function prolongations(message, finpouet) {
  return
}


function findItemInList(list, item) {
  var fail = 0;
  var temi;
  list.forEach(element => {
    if (element.indexOf(item) != -1) {
      temi = list.indexOf(element);
    } else {
      fail++;
    }
  });
  if (fail === list.length) {
    throw new ReferenceError("L'item n'a pas été trouvé dans la liste");
  } else {
    return temi;
  }
}

function Distribution(message) {

  getPlaceInDb("logs", message);
  var logs = message.guild.channels.get(lieuDB[message.guild.id]);

  getPlaceInDb("loups", message);
  var lieuLG = lieuDB[message.guild.id];

  //Garde en mémoire le message dans la guilde
  var mess = message
  var number = comp
    .get("composition")
    .map("id")
    .value().length;
  var valides = [];
  var once = true;

  var distribText = "";
  compo[message.guild.id].forEach(role => {
    var item = findObjectInList(compo[message.guild.id], "Name", role.Name);
    for (
      let i = 0;
      i <
      item.Quantite;
      i++
    ) {
      distribution[message.guild.id].push(
        item.Name
      );
    }
    comp
      .get("composition")
      .push({
        guild: message.guild.id,
        id: number,
        compo: distribution[message.guild.id]
      })
      .write();
  });
  inscrits[message.guild.id].forEach(inscrit => {
    var rnd = Math.floor(
      Math.random() * distribution[message.guild.id].length + 0
    );
    const filter2 = m => inscrits[message.guild.id].includes(m.author.id);
    var roleRND = distribution[message.guild.id][rnd];
    var joueur = message.guild.members.get(inscrit);

    distribRoles[message.guild.id].push({
      GuildMember: joueur,
      Role: roleRND,
      User: joueur.user,
      Victoire: "Partie toujours en cours"
    });
    distribution[message.guild.id].splice(
      distribution[message.guild.id].indexOf(roleRND),
      1
    );
    joueur.createDM().then(channel => {
      channel.send(
        "Tu es " +
        roleRND +
        " ! Merci de renvoyer un message ici (peu importe quoi) pour confirmer. \nSi tu veux savoir en quoi consiste ton rôle, fait ``/ask " +
        roleRND +
        "``, ou bien envoie un message à l'un des MJs."
      );
      collector = channel.createCollector(filter2);
      collector.on("collect", message => {
        if (!valides.includes(message.channel)) {
          valides.push(message.channel);
          var item = findObjectInList(distribRoles[mess.guild.id], "GuildMember", joueur)
          if (item.Role === LG[mess.guild.id]) {
            mess.guild.channels
              .get(lieuLG)
              .overwritePermissions(item.User, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
              });
            joueursLG[mess.guild.id].push(item.User);
          }
          logs.send(item.User.username + ", " + item.Role + " validé.");
        }
        if (
          valides.length === inscrits[mess.guild.id].length &&
          once
        ) {
          collector.stop();
          once = false;
          mess.guild.channels
            .get(lieuLG)
            .send(
              "Ce salon est destiné aux discussions nocturnes entre " + LG[mess.guild.id] + " !"
            );
        }
      });
    });
  });
  for (let i = 0; i < distribRoles[message.guild.id].length; i++) {
    distribText =
      distribText +
      distribRoles[message.guild.id][i].User.username +
      " est " +
      distribRoles[message.guild.id][i].Role +
      ", ";
  }
  logs.send(distribText);
}

function Recap(channel) {
  embedRecap = new Discord.RichEmbed()
    .setTitle("Récapitulatif de la partie")
    .setDescription("Victoire des **" + win[channel.guild.id] + "** !")
    .setThumbnail(
      "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte2.png"
    )
    .setColor("#FFFF00");

  distribRoles[channel.guild.id].forEach(role => {
    embedRecap.addField(
      role.Victoire,
      role.User + " était **" + role.Role + "** *(vivant)*."
    );
  });

  distribRolMorts[channel.guild.id].forEach(mort => {
    embedRecap.addField(
      "Perdant",
      mort.User + " était **" + mort.Role + "** *(mort)*."
    );
  });

  channel.send(embedRecap);
}

function helpGen(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  var embed = new Discord.RichEmbed()
    .setTitle("Aide des commandes")
    .setDescription("Commandes accessibles pour **" + lui.username + "**.")
    .addField("Préfixe", "``/``")
    .addField("► ``help``", "Affiche cette interface")
    .addField("► ``ask [rôle]``", "Affiche les informations sur un rôle.")
    .addField("► ``ping``", "Vérifie l'activité du bot.")
    .addField(
      "Quel type de commandes souhaitez-vous connaître ?",
      ":video_game: pour les commandes en jeu\n :desktop: pour les commandes d'administration\n :tools: pour les commandes de configuration."
    )
    .setColor("#f1c40f");
  if (message.author != bot.user) {
    message.channel.send(embed).then(message => {
      message.react("🎮");
      message.react("🖥️");
      message.react("🛠️");
      var collectorHelp = message.createReactionCollector(filter);
      collectorHelp.on("collect", reac => {
        switch (reac.emoji.name) {
          case "🖥️":
            collectorHelp.stop();
            helpAdmin(message, lui);
            break;
          case "🎮":
            collectorHelp.stop();
            helpGameGen(message, lui);
            break;
          case "🛠️":
            collectorHelp.stop();
            helpTools(message, lui);
            break;

          default:
            break;
        }
      });
    });
  } else {
    message.clearReactions();
    message.edit(embed).then(message => {
      message.react("🎮");
      message.react("🖥️");
      message.react("🛠️");
      var collectorHelp = message.createReactionCollector(filter);
      collectorHelp.on("collect", reac => {
        switch (reac.emoji.name) {
          case "🖥️":
            collectorHelp.stop();
            helpAdmin(message, lui);
            break;
          case "🎮":
            collectorHelp.stop();
            helpGameGen(message, lui);
            break;
          case "🛠️":
            collectorHelp.stop();
            helpTools(message, lui);
            break;

          default:
            break;
        }
      });
    });
  }
}

function helpAdmin(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpAdmin1).then(message => {
    message.react("◀️");
    var collectorHadmin = message.createReactionCollector(filter);
    collectorHadmin.on("collect", reac => {
      if (reac.emoji.name === "◀️") {
        collectorHadmin.stop();
        helpGen(message, lui);
      }
    });
  });
}

function helpGameGen(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpGameGen).then(message => {
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    message.react("◀️");
    var collectorGG = message.createReactionCollector(filter);
    collectorGG.on("collect", reac => {
      switch (reac.emoji.name) {
        case "1️⃣":
          collectorGG.stop();
          helpGameOne(message, lui);
          break;
        case "2️⃣":
          collectorGG.stop();
          helpGameTwo(message, lui);
          break;
        case "3️⃣":
          collectorGG.stop();
          helpGameThree(message, lui);
          break;
        case "◀️":
          collectorGG.stop();
          helpGen(message, lui);
          break;

        default:
          break;
      }
    });
  });
}

function helpGameOne(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpGame1).then(message => {
    message.react("◀️");
    message.react("2️⃣");
    message.react("3️⃣");
    var collectorG1 = message.createReactionCollector(filter);
    collectorG1.on("collect", reac => {
      switch (reac.emoji.name) {
        case "◀️":
          collectorG1.stop();
          helpGameGen(message, lui);
          break;
        case "2️⃣":
          collectorG1.stop();
          helpGameTwo(message, lui);
          break;
        case "3️⃣":
          collectorG1.stop();
          helpGameThree(message, lui);
          break;

        default:
          break;
      }
    });
  });
}

function helpGameTwo(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpGame2).then(message => {
    message.react("◀️");
    message.react("1️⃣");
    message.react("3️⃣");
    message.react("⚠️");
    var collectorG2 = message.createReactionCollector(filter);
    collectorG2.on("collect", reac => {
      switch (reac.emoji.name) {
        case "◀️":
          collectorG2.stop();
          helpGameGen(message, lui);
          break;
        case "1️⃣":
          collectorG2.stop();
          helpGameOne(message, lui);
          break;
        case "3️⃣":
          collectorG2.stop();
          helpGameThree(message, lui);
          break;
        case "⚠️":
          collectorG2.stop();
          helpGameWeird(message, lui);
          break;

        default:
          break;
      }
    });
  });
}

function helpGameWeird(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpGame2Chelou).then(message => {
    message.react("◀️");
    var collectorGW = message.createReactionCollector(filter);
    collectorGW.on("collect", reac => {
      if (reac.emoji.name === "◀️") {
        collectorGW.stop();
        helpGameTwo(message, lui);
      }
    });
  });
}

function helpGameThree(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpGame3).then(message => {
    message.react("◀️");
    message.react("1️⃣");
    message.react("2️⃣");
    var collectorG3 = message.createReactionCollector(filter);
    collectorG3.on("collect", reac => {
      switch (reac.emoji.name) {
        case "◀️":
          collectorG3.stop();
          helpGameGen(message, lui);
          break;
        case "1️⃣":
          collectorG3.stop();
          helpGameOne(message, lui);
          break;
        case "2️⃣":
          collectorG3.stop();
          helpGameTwo(message, lui);
          break;

        default:
          break;
      }
    });
  });
}

function helpTools(message, lui) {
  var filter = reac => reac.users.map(u => u.username).includes(lui.username);
  message.clearReactions();
  message.edit(Embeds.helpTools).then(message => {
    message.react("◀️");
    var collectorT = message.createReactionCollector(filter);
    collectorT.on("collect", reac => {
      if (reac.emoji.name === "◀️") {
        collectorT.stop();
        helpGen(message, lui);
      }
    });
  });
}

function cleanArray(array) {
  var i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    out.push(j);
  }
  return out;
}

let poem =
  "Quand la lune blanche \nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir,\nFol alors qui livre\nA la nuit son livre\nSavant,\nSon pied aux collines,\nEt ses mandolines\nAu vent ;\nFol qui dit un conte,\nCar minuit qui compte\nLe temps,\nPasse avec le prince\nDes sabbats qui grince\nDes dents.\nL’amant qui compare\nQuelque beauté rare\nAu jour,\nTire une ballade\nDe son coeur malade\nD’amour.\nMais voici dans l’ombre\nQu’une ronde sombre\nSe fait,\nL’enfer autour danse,\nTous dans un silence\nParfait.\nTout pendu de Grève,\nTout Juif mort soulève\nSon front,\nTous noyés des havres\nPressent leurs cadavres\nEn rond.\nEt les âmes feues\nJoignent leurs mains bleues\nSans os ;\nLui tranquille chante\nD’une voix touchante\nSes maux.\nMais lorsque sa harpe,\nOù flotte une écharpe,\nSe tait,\nIl veut fuir… La danse\nL’entoure en silence\nParfait.\nLe cercle l’embrasse,\nSon pied s’entrelace\nAux morts,\nSa tête se brise\nSur la terre grise !\nAlors\nLa ronde contente,\nEn ris éclatante,\nLe prend ;\nTout mort sans rancune\nTrouve au clair de lune\nSon rang.\nCar la lune blanche\nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir.\nAlfred de Musset, Poésies posthumes";


  var admin = {};
  var mini = {};
  var gameOn = {};
  var messCompo = {};
  var compoDone = {};
  var inscrEmbed = {};

  var maxP = {};
  var inscr = {};

  var nbRole = {};
  var inscrits = {};
  var inscrep = {};
  //{GuildMember,Role,User,Victoire}
  var distribRoles = {};
  var distribRolMorts = {};
  var charmes = {};
  var votes = {};
  var avote = {};
  //{user,votes,contenu}
  var voted = {};
  var joueursLG = {};
  var Listvivants = {};
  var vivants = {};
  var win = {};
  var embedRecap = {};

  var distribution = {};
  //Représente l'état de la partie, avec nuit ou jour en première clef, le nombre en deuxième
  var StateOfTheGame = {}

  var listeRoles = {}

  let theme = {};

  let IDlg = {}
  let LG = {}
  let emoteLG = {}
  let IDcupi = {}
  let Cupi = {}
  let emoteCupi = {}
  let IDsoso = {}
  let Soso = {}
  let emoteSoso = {};
  let IDvovo = {}
  let Vovo = {}
  let emoteVovo = {}
  let IDchassou = {}
  let Chassou = {}
  let emoteChassou = {}
  let IDidv = {}
  let IDV = {}
  let emoteIDV = {}
  let Ancien = {}
  let emoteAncien = {}
  let IDancien = {}
  let IDjdf = {}
  let JDF = {}
  let emoteJDF = {}
  let IDsalva = {}
  let Salva = {}
  let emoteSalva = {}
  let IDsv = {}
  let SV = {}
  let emoteSV = {}
  let BE = {}
  let IDbe = {}
  let emoteBE = {}
  let PF = {}
  let IDpf = {}
  let emotePF = {}

  var rolesDeNuit = {};
  var potVie = {};
  var potMort = {};
  var Lovers = {};

  //{Name,Quantite,Emote}
  var compo = {};

  var banniDeVote = {};
  let IDVcache = {};
  var jourBE = {};

  //Cupidon messages
  let eux = {};
  var ConfCupi = {};

  //Sorcière messages
  var ConfSoso = {};
  var victime = {};
  var next = {};
  var salonLog = {};
  var guildId = {};

  var votedejour = {};

  var roleDB = {};
  var lieuDB = {};
  var x = {};
  var y = {};
  var z = {};
  var pouet = {};

  function init(id) {
      mini[id] = false;
      gameOn[id] = false;
      compoDone[id] = false;
      nbRole[id] = 0;
      inscrits[id] = [];
      inscrep[id] = [];
      distribRoles[id] = [];
      distribRolMorts[id] = [];
      charmes[id] = [];
      votes[id] = [];
      avote[id] = [];
      voted[id] = [];
      joueursLG[id] = [];
      vivants[id] = "";
      win[id] = null;

      distribution[id] = [];
      StateOfTheGame[id] = ["", 0];

      theme[id] = "classique";
      rolesDeNuit[id] = [];
      potVie[id] = true;
      potMort[id] = true;
      Lovers[id] = [];
      compo[id] = [];

      listeRoles[id] = [];

      IDlg[id] = []
      LG[id] = ""
      emoteLG[id] = ""
      IDcupi[id] = []
      Cupi[id] = ""
      emoteCupi[id] = ""
      IDsoso[id] = []
      Soso[id] = ""
      emoteSoso[id] = ""
      IDvovo[id] = []
      Vovo[id] = ""
      emoteVovo[id] = ""
      IDchassou[id] = []
      Chassou[id] = ""
      emoteChassou[id] = ""
      IDidv[id] = []
      IDV[id] = ""
      emoteIDV[id] = ""
      Ancien[id] = ""
      emoteAncien[id] = ""
      IDancien[id] = []
      IDjdf[id] = []
      JDF[id] = ""
      emoteJDF[id] = ""
      IDsalva[id] = []
      Salva[id] = ""
      emoteSalva[id] = []
      IDsv[id] = []
      SV[id] = ""
      emoteSV[id] = ""
      BE[id] = ""
      IDbe[id] = []
      emoteBE[id] = ""
      PF[id] = ""
      IDpf[id] = []
      emotePF[id] = ""

      banniDeVote[id] = [];
      IDVcache[id] = true;
      jourBE[id] = false;
      //Cupidon messages
      eux[id] = [];

      //Sorcière messages
      victime[id] = "";
      next[id] = false;
      guildId[id] = id;

      votedejour[id] = false;
  }