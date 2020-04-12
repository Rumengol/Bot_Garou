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
const bot = new Discord.Client();
const express = require("express");
const PORT = process.env.PORT || 5000;
const Enmap = require("enmap");
const fs = require("fs");
const global = require("./src/global.js");

express().listen(PORT);

function Activity() {
  actif = setInterval(function() {
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

getAllCommands("./src/commands/", false);

function getAllCommands(path, isDir) {
  fs.readdir(path, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (fs.lstatSync(`${path}${file}`).isDirectory()) {
        getAllCommands(`${path}${file}/`, true);
      }
      console.log(file.toString());
      if (!file.endsWith(".js")) return;
      // Load the command file itself
      let props = require(`${path}${file}`);
      // Get just the command name from the file name
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      // Here we simply store the whole thing in the command Enmap. We're not running it right now.
      bot.commands.set(commandName, props);
    });
  });
}

bot.on("ready", () => {
  Activity();
  for (const guild of bot.guilds.values()) {
    global.init(guild.id);
  }
  console.log("GRAOU est prêt!");
});

bot.login(token);

/*bot.on("message", message => {
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
        }

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
        ) {/in
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
          return;
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
          return;
        }

        //termine la partie
        else if (spliteMessage[0] == prefix + "gamend") {
          return;
        }

        //termine la session
        else if (spliteMessage[0] == prefix + "allend") {
          return;
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
          return;
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
          return;
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
          return;
        }
        
        else if (spliteMessage[0] === prefix + "decharme") {
          return;
        }

        //arrête toutes les actions en cours
        else if (spliteMessage[0] === prefix + "stop") {
          return;
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
        return;
      }
      //aide générale
      else if (spliteMessage[0] === prefix + "help") {
        return;
      }

      //Suggestions
      else if (spliteMessage[0] === prefix + "suggestion") {
        return;
      }
    }
  } catch (e) {
    message.reply(e.message);
    console.error(e);
  }
});*/

function UsePotMort() {
  return;
}

function Charme() {
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
    if (vocal.members.includes(lui)) lui.setMute(false);
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
  return;
}

function Kill(message, lui) {
  return;
}

function endVote() {
  return;
}

function deathBE(message, item) {
  return;
}

function voteJour(message, egalite = null) {
  return;
}

function prolongations(message, finpouet) {
  return;
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
  var mess = message;
  var number = comp
    .get("composition")
    .map("id")
    .value().length;
  var valides = [];
  var once = true;

  var distribText = "";
  compo[message.guild.id].forEach(role => {
    var item = findObjectInList(compo[message.guild.id], "Name", role.Name);
    for (let i = 0; i < item.Quantite; i++) {
      distribution[message.guild.id].push(item.Name);
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
          var item = findObjectInList(
            distribRoles[mess.guild.id],
            "GuildMember",
            joueur
          );
          if (item.Role === LG[mess.guild.id]) {
            mess.guild.channels.get(lieuLG).overwritePermissions(item.User, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            });
            joueursLG[mess.guild.id].push(item.User);
          }
          logs.send(item.User.username + ", " + item.Role + " validé.");
        }
        if (valides.length === inscrits[mess.guild.id].length && once) {
          collector.stop();
          once = false;
          mess.guild.channels
            .get(lieuLG)
            .send(
              "Ce salon est destiné aux discussions nocturnes entre " +
                LG[mess.guild.id] +
                " !"
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
  return;
}

function cleanArray(array) {
  var i,
    j,
    len = array.length,
    out = [],
    obj = {};
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
var StateOfTheGame = {};

var listeRoles = {};

let theme = {};

let IDlg = {};
let LG = {};
let emoteLG = {};
let IDcupi = {};
let Cupi = {};
let emoteCupi = {};
let IDsoso = {};
let Soso = {};
let emoteSoso = {};
let IDvovo = {};
let Vovo = {};
let emoteVovo = {};
let IDchassou = {};
let Chassou = {};
let emoteChassou = {};
let IDidv = {};
let IDV = {};
let emoteIDV = {};
let Ancien = {};
let emoteAncien = {};
let IDancien = {};
let IDjdf = {};
let JDF = {};
let emoteJDF = {};
let IDsalva = {};
let Salva = {};
let emoteSalva = {};
let IDsv = {};
let SV = {};
let emoteSV = {};
let BE = {};
let IDbe = {};
let emoteBE = {};
let PF = {};
let IDpf = {};
let emotePF = {};

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

  IDlg[id] = [];
  LG[id] = "";
  emoteLG[id] = "";
  IDcupi[id] = [];
  Cupi[id] = "";
  emoteCupi[id] = "";
  IDsoso[id] = [];
  Soso[id] = "";
  emoteSoso[id] = "";
  IDvovo[id] = [];
  Vovo[id] = "";
  emoteVovo[id] = "";
  IDchassou[id] = [];
  Chassou[id] = "";
  emoteChassou[id] = "";
  IDidv[id] = [];
  IDV[id] = "";
  emoteIDV[id] = "";
  Ancien[id] = "";
  emoteAncien[id] = "";
  IDancien[id] = [];
  IDjdf[id] = [];
  JDF[id] = "";
  emoteJDF[id] = "";
  IDsalva[id] = [];
  Salva[id] = "";
  emoteSalva[id] = [];
  IDsv[id] = [];
  SV[id] = "";
  emoteSV[id] = "";
  BE[id] = "";
  IDbe[id] = [];
  emoteBE[id] = "";
  PF[id] = "";
  IDpf[id] = [];
  emotePF[id] = "";

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
