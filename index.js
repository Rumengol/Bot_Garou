//to do :
//Le collecteur de la nuit derp : on est au courant
//Rajouter une image au début du jour avec les joueurs vivants & morts (sous forme de tombe) avec pseudos : c'pas demain la veille
//Permettre une configuration personnalisée
//LE SITE
//Système de leveling

//TODO Thèmes :
//Star Wars
//Epithet Erased

//Notice pour rajouter un rôle :
//- Rajouter sa logique d'action dans la commande  'nuit'
//- Rajouter son ID et son nom
//- Le rajouter dans RolesDeNuit s'il agit la nuit

const Discord = require("discord.js");
const Embed = require("./commands/embeds");
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

const adeupter = new FileSync("composition.json");
const comp = low(adeupter);

express().listen(PORT);

function Activity() {
  actif = setInterval(function() {
    console.log("ping");
  }, 540000);
}

const token = require("./Auth.json");

var adminlist = db
  .get("administrateurs")
  .map("story_value")
  .value()
  .toString();

db.defaults({ administrateurs: [] }).write();
db.defaults({ ministrateurs: [] }).write();
db.defaults({ salons: [] }).write();
db.defaults({ roles: [] }).write();

comp.defaults({ composition: [] }).write();

bot.on("ready", () => {
  Activity();
  for (const guild of bot.guilds.values()) {
    init(guild.id);
  }
  console.log("GRAOU est prêt!");
});

bot.login(token.bot_token);

const prefix = "/";
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

const identifiers = [
  "vivants",
  "morts",
  "village",
  "votes",
  "vocal",
  "charmed",
  "general",
  "loups",
  "logs",
  "cimetierre"
];

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
  StateOfTheGame[id] = ["",0];

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
  emoteSoso[id] =  ""
  IDvovo[id] =  []
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
        checkmin(message);
      

      if (spliteMessage[0] === prefix + "ping") {
        if (adminlist.includes(message.author)) {
          message.reply("Pong, grand administrateur");
        } else if (mini[message.guild.id]) {
          message.reply("Pong administrateur !");
        } else {
          message.reply("pong");
        }
      }

      //initialisation des rôles admins
      else if (
        spliteMessage[0] == prefix + "defadmin" &&
        spliteMessage[1] != null
      ) {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          admin = spliteMessage[1];
          var number = db
            .get("administrateurs")
            .map("id")
            .value().length;
          db.get("administrateurs")
            .push({ id: number, story_value: admin, user: admin.id })
            .write();
          message.channel.send(
            "Enregistré, " + admin + " est désormais administrateur."
          );
        } else {
          message.reply(
            "Nahmaisho ! Seul un administrateurs peut en nommer un autre !"
          );
        }
      }

      //supprime le membre mentionné des administrateurs
      else if (
        spliteMessage[0] == prefix + "supadmin" &&
        spliteMessage[1] != null
      ) {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          noadmin = spliteMessage[1];
          db.get("administrateurs")
            .remove({ story_value: noadmin })
            .write();
          message.reply(noadmin + " supprimé des administrateurs.");
        } else {
          message.reply(
            "Nahmaisho ! Seul un administrateurs peut en révoquer un autre !"
          );
        }
      }
      //initialisation des rôles admins sur un serveur unique
      else if (
        spliteMessage[0] == prefix + "defadminhere" &&
        spliteMessage[1] != null
      ) {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          admin = spliteMessage[1];
          var number = db
            .get("ministrateurs")
            .map("id")
            .value().length;
          db.get("ministrateurs")
            .push({ guild: message.guild.id, id: number, story_value: admin })
            .write();
          message.channel.send(
            "Enregistré, " +
              admin +
              " est désormais administrateur sur ce serveur."
          );
        } else {
          message.reply(
            "Nahmaisho ! Seul un administrateurs peut en nommer un autre !"
          );
        }
      }

      //supprime le membre mentionné des administrateurs d'un serveur unique
      else if (
        spliteMessage[0] == prefix + "supadminhere" &&
        spliteMessage[1] != null
      ) {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          noadmin = spliteMessage[1];
          db.get("ministrateurs")
            .remove({ guild: message.guild.id, story_value: noadmin })
            .write();
          message.reply(
            noadmin + " supprimé des administrateurs de ce serveur."
          );
        } else {
          message.reply(
            "Nahmaisho ! Seul un administrateurs peut en révoquer un autre !"
          );
        }
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
              setTimeout(function() {
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
        ) {
          if (spliteMessage[2] != null) {
            if (identifiers.toString().includes(spliteMessage[2])) {
              getRoleInDb(spliteMessage[2], message);
              role = roleDB[message.guild.id];
              //Si c'est le cas
              if (role != null) {
                //Demande si le salon doit être remplacé
                question = message.channel.send(
                  "Un rôle est déjà attribué à cet identifiant. Voulez-vous le remplacer ? \n ``Oui/Non``"
                );
                //Crée un collecteur laissant une marge de 10 secondes pour répondre, qui ne réagit qu'à l'auteur du message

                collector = message.channel.createCollector(filter, {
                  time: 10000
                });
                collector.on("collect", message => {
                  //S'il répond oui, alors le salon est remplacé
                  if (message.content.toLowerCase() === "oui") {
                    db.get("roles")
                      .push({
                        guild: message.guild.id,
                        id: spliteMessage[2],
                        story_value: spliteMessage[1]
                      })
                      .write();
                    db.get("roles")
                      .remove({
                        guild: message.guild.id,
                        id: spliteMessage[2],
                        story_value: role
                      })
                      .write();
                    message.channel.send(
                      "<@&" +
                        spliteMessage[1] +
                        ">" +
                        " ajouté comme rôle des " +
                        spliteMessage[2]
                    );
                    collector.stop();
                  } else if (message.content.toLowerCase() === "non") {
                    //S'il répond non, la commande est annulée
                    message.channel
                      .send("Commande annulée.")
                      .then(function(temp) {
                        temp.delete(5000);
                      });
                    collector.stop();
                  } else {
                    //S'il répond autre chose, une erreur est affichée
                    temp = message.reply(
                      "Erreur, veuillez répondre par oui ou par non."
                    );
                  }
                });
              } else {
                db.get("roles")
                  .push({
                    guild: message.guild.id,
                    id: spliteMessage[2],
                    story_value: spliteMessage[1]
                  })
                  .write();
                message.channel.send(
                  "<@&" +
                    spliteMessage[1] +
                    ">" +
                    " ajouté comme rôle des " +
                    spliteMessage[2]
                );
              }
            } else {
              message.reply(
                "identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid"
              );
            }
          } else {
            message.reply(
              "syntaxe incorrecte. La bonne syntaxe est : /Addrole [ID du role] [Identifiant]"
            );
          }
        } else {
          message.reply(
            "commande refusée. Seuls les administrateurs peuvent ajouter des rôles."
          );
        }
      }

      //suppression du rôle
      else if (spliteMessage[0] == prefix + "supprole") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[2] != null) {
            if (identifiers.toString().includes(spliteMessage[2])) {
              db.get("roles")
                .remove({
                  guild: message.guild.id,
                  id: spliteMessage[2],
                  story_value: spliteMessage[1]
                })
                .write();
              message.channel.send(
                "<@&" + spliteMessage[1] + "> supprimé des rôles."
              );
            } else {
              message.reply(
                "identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid"
              );
            }
          } else {
            message.reply(
              "syntaxe incorrecte. La bonne syntaxe est : /Supprole [ID du rôle] [Identifiant]"
            );
          }
        } else {
          message.reply(
            "commande refusée. Seuls les administrateurs peuvent supprimer des rôles."
          );
        }
      }
      //initialistion des lieux
      else if (spliteMessage[0] == prefix + "addsalon") {
        //Vérification que l'auteur est administrateur, au moins local
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          //Vérification que l'identifiant est fourni
          if (spliteMessage[2] != null) {
            //Vérification que l'identifiant fourni est reconnu
            if (identifiers.includes(spliteMessage[2])) {
              //Récupère le lieu dans la base de données s'il est présent
              getPlaceInDb(spliteMessage[2], message);
              lieu = lieuDB[message.guild.id];
              //Si c'est le cas
              if (lieu != null) {
                //Demande si le salon doit être remplacé
                question = message.channel.send(
                  "Un salon est déjà attribué à cet identifiant. Voulez-vous le remplacer ? \n ``Oui/Non``"
                );
                //Crée un collecteur laissant une marge de 10 secondes pour répondre, qui ne réagit qu'à l'auteur du message

                collector = message.channel.createCollector(filter, {
                  time: 10000
                });
                collector.on("collect", message => {
                  //S'il répond oui, alors le salon est remplacé
                  if (
                    message.content.toLowerCase() === "oui" ||
                    message.content.toLowerCase() === "o"
                  ) {
                    db.get("salons")
                      .push({
                        guild: message.guild.id,
                        id: spliteMessage[2],
                        story_value: spliteMessage[1]
                      })
                      .write();
                    db.get("salons")
                      .remove({
                        guild: message.guild.id,
                        id: spliteMessage[2],
                        story_value: lieu
                      })
                      .write();
                    message.channel.send(
                      "<#" +
                        spliteMessage[1] +
                        ">" +
                        " remplacé comme salons " +
                        spliteMessage[2]
                    );
                    collector.stop();
                  } else if (
                    message.content.toLowerCase() === "non" ||
                    message.content.toLowerCase() === "n"
                  ) {
                    //S'il répond non, la commande est annulée
                    message.channel
                      .send("Commande annulée.")
                      .then(function(temp) {
                        temp.delete(5000);
                      });
                    collector.stop();
                  } else {
                    //S'il répond autre chose, une erreur est affichée
                    message
                      .reply("Erreur, veuillez répondre par oui ou par non.")
                      .then(function(temp) {
                        temp.delete(5000);
                      });
                  }
                });
              } else {
                db.get("salons")
                  .push({
                    guild: message.guild.id,
                    id: spliteMessage[2],
                    story_value: spliteMessage[1]
                  })
                  .write();
                message.channel.send(
                  "<#" +
                    spliteMessage[1] +
                    ">" +
                    " ajouté comme salons " +
                    spliteMessage[2]
                );
              }
            } else {
              message.reply(
                "identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid"
              );
            }
          } else {
            message.reply(
              "syntaxe incorrecte. La bonne syntaxe est : /addsalon [ID du salon] [Identifiant]"
            );
          }
        } else {
          message.reply(
            "commande refusée. Seuls les administrateurs peuvent ajouter des salons."
          );
        }
      }

      //suppression du lieu
      else if (spliteMessage[0] == prefix + "suppsalon") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[2] != null) {
            if (identifiers.toString().includes(spliteMessage[2])) {
              db.get("salons")
                .remove({
                  guild: message.guild.id,
                  id: spliteMessage[2],
                  story_value: spliteMessage[1]
                })
                .write();
              message.channel.send(
                "<#" + spliteMessage[1] + "> supprimé des salons."
              );
            } else {
              message.reply(
                "identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid"
              );
            }
          } else {
            message.reply(
              "syntaxe incorrecte. La bonne syntaxe est : /suppsalon [ID du salon] [Identifiant]"
            );
          }
        } else {
          message.reply(
            "commande refusée. Seuls les administrateurs peuvent supprimer des salons ."
          );
        }
      }

      //configuration du serveur
      else if (spliteMessage[0] == prefix + "config") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[1] == "auto") {
            var guild = message.guild;
            if(db.get("roles").map("guild").value().toString().includes(guild.id) || db.get("salons").map("guild").value().toString().includes(guild.id)){
              message.reply("Attention, au moins un élément est configuré sur ce serveur. Veuillez le(s) retirer afin d'activer la configuration automatique.")
            } else {
            message.channel.send(
              "Configuration automatique du serveur en cours, veuillez patienter..."
            );
            var roleJV = guild
              .createRole({
                name: "Joueurs Vivants",
                color: "DARK_GREEN",
                mentionable: "true"
              })
              .then(roleJV => {
                
                db.get("roles")
                  .push({
                    guild: guild.id,
                    id: "vivants",
                    story_value: roleJV.id
                  })
                  .write();
                  message.channel.send(`Le rôle ${roleJV} a été créé...`);

                  var roleJM = guild
              .createRole({
                name: "Joueurs Morts",
                color: "DARK_PURPLE",
                mentionable: "true",
                position: roleJV.position - 1
              })
              .then(roleJM => {
                db.get("roles")
                  .push({
                    guild: guild.id,
                    id: "morts",
                    story_value: roleJM.id
                  })
                  .write();
                  message.channel.send(`Le rôle ${roleJM} a été créé...`);

              var game = guild.createChannel("Jeu Loup Garou",{
                type: "category",
                position: 0
              }).then(game => {
                message.channel.send(`La catégorie **${game.name}** a été créée...`);

              var village = guild.createChannel("place-du-village",{
                type: "text",
                topic: "Débattez ici la journée.",
                position : 1,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL"]
                  },
                  {
                  id : roleJV.id,
                  deny : ["SEND_MESSAGES"],
                  allow : ["VIEW_CHANNEL"]
                  },
                  {
                    id : roleJM.id,
                    deny : ["SEND_MESSAGES"],
                    allow : ["VIEW_CHANNEL"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "village",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)

              var vote = guild.createChannel("votes",{
                type: "text",
                topic: "Votez ici pour savoir qui aura l'honneur d'être accroché au grand arbre.",
                position : 2,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  },
                  {
                  id : roleJV.id,
                  deny : ["SEND_MESSAGES","VIEW_CHANNEL"]
                  },
                  {
                    id : roleJM.id,
                    deny : ["SEND_MESSAGES"],
                    allow : ["VIEW_CHANNEL"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "votes",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)

              var cimetiere = guild.createChannel("cimetière",{
                type: "text",
                topic: "Lieu de villégiature des morts, qui observent les tracas des vivants.",
                position : 5,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  },
                  {
                    id : roleJM.id,
                    allow : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "cimetiere",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)

              var taniere = guild.createChannel("tanière-des-loups",{
                type: "text",
                topic: "Le repaire des lycanthropes lorsque tombe la nuit.",
                position : 3,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "loups",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)

              var audience = guild.createChannel("audience",{
                type: "text",
                topic: "Une flûte enjôleuse, un public apathique, chaque nuit plus important.",
                position : 1,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "charmed",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)
              var logs = guild.createChannel("logs-bot-garou",{
                type: "text",
                topic: "Un salon pour le maître du jeu, qu'il puisse recueillir toutes les informations relatives à la partie.",
                position : 0,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["VIEW_CHANNEL","SEND_MESSAGES"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "logs",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon ${channel} a été créé...`)
              var general = guild.createChannel("Vocal général",{
                type: "voice",
                position : 1
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "general",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon vocal **${channel.name}** a été créé...`)
              var vocal = guild.createChannel("Place Du Village",{
                type: "voice",
                position : 2,
                permissionOverwrites: [
                  {
                    id : guild.id,
                    deny : ["CONNECT","SPEAK"]
                  },
                  {
                  id : roleJV.id,
                  allow : ["SPEAK","CONNECT"]
                  },
                  {
                    id : roleJM.id,
                    deny : ["SPEAK"],
                    allow : ["CONNECT"]
                  }
              ]
              }).then(channel =>{
                db.get("salons")
                      .push({
                        guild: guild.id,
                        id: "vocal",
                        story_value: channel.id
                      })
                      .write();
                channel.setParent(game.id)
                message.channel.send(`Le salon vocal **${channel.name}** a été créé...`).then(()=> 
                  message.channel.send("Tous les salons et les rôles ont étés créés. Vous pouvez librement les renommer, modifier et déplacer, mais faites attention à ne pas les supprimer par inadvertance, auquel cas je risquerais de dysfonctionner."))
              });
              });
              });
              });
              });
              });
              });
              });
              });
              });
              });
            }
          } else {
            message.reply(
              "Quelle type de configuration souhaitez-vous ? Actuellement, seule ``/config auto`` est disponible."
            );
          }
        } else {
          message.reply("Seul un administrateur peut configurer le serveur");
        }
      }

      //inscription
      else if (spliteMessage[0] === prefix + "inscription") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          maxP[message.guild.id] = spliteMessage[1];
          message.delete();
          inscrEmbed[message.guild.id] = new Discord.RichEmbed()
            .setTitle("Inscriptions pour les parties de loup Garou")
            .setDescription(
              "Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
                maxP[message.guild.id] +
                "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
            );
          message.channel
            .send(inscrEmbed[message.guild.id])
            .then(function(message) {
              message.react("🐺").catch(console.error);
              inscr[message.guild.id] = message;
            });
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
          if (gameOn === false) {
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
      } else if (spliteMessage[0] == prefix + "win") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[1] != null) {
            var victoire = "**VICTORIEUX** 👑";
            var defaite = "Perdant";
            var villageois = Presets[theme[message.guild.id]].villageois
            var amoureux = Presets[theme[message.guild.id]].amour.Amoureux
            var jdf = findObjectInList(Presets[theme[message.guild.id]].roles,"Title","Joueur De Flûte")

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
                if (role.role === JDF[message.guild.id]) {
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

          if ((win[message.guild.id ] != null)) Recap(village);
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

          charmes = [];
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
            blep = setTimeout(function() {
              eux[message.guild.id].forEach(lui => {
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
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            if (spliteMessage[1].match(/^\d+$/)) {
              var nombre = parseInt(spliteMessage[1]);
              message.channel.bulkDelete(nombre + 1);
            } else {
              message.channel.send(
                "Erreur, il me faut un nombre de message à nettoyer! "
              );
            }
          } else {
            message.channel.send("Erreur, je ne peux pas nettoyer ça.");
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Mute (vocal) la personne mentionnée
      else if (spliteMessage[0] === prefix + "mute") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            message.guild.member(message.mentions.users.first()).setMute(true);
            message.channel.send(
              message.guild.member(message.mentions.users.first()) +
                " est mute !"
            );
          } else {
            message.reply("Qui dois-je mute ?");
          }
          message.delete();
        } else {
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Unmute (vocal) la personne mentionnée
      else if (spliteMessage[0] === prefix + "unmute") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            message.guild.member(message.mentions.users.first()).setMute(false);
            message.channel.send(
              message.guild.member(message.mentions.users.first()) +
                " n'est plus mute !"
            );
          } else {
            message.reply("Qui dois-je unmute ?");
          }
          message.delete();
        } else {
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
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
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            let lui = message.guild.member(message.mentions.users.first());
            if (lui === null) {
              message.reply(
                "Formulation incorrecte. La bonne syntaxe est : /Kill @[utilisateur]."
              );
            } else {
              Kill(message, lui);
            }
          } else {
            message.reply(
              "Formulation incorrecte. La bonne syntaxe est : /Kill @[utilisateur]."
            );
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      } else if (spliteMessage[0] === prefix + "revive") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            let lui = message.guild.member(message.mentions.users.first());
            if (lui === null) {
              message.reply(
                "Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur] ou /reviveall."
              );
            } else {
              getRoleInDb("morts", message);
              role = roleDB[message.guild.id];
              getRoleInDb("vivants", message);
              role2 = roleDB[message.guild.id];
              lui.addRole(role2);
              setTimeout(() => {
                lui.removeRole(role);
              }, 1000);
              getPlaceInDb("village", message);
              lieu = lieuDB[message.guild.id];
              message.guild.channels.get(lieu).send(lui + " a ressuscité !");
              lui.setMute(false);
            }
          } else {
            message.reply(
              "Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur]."
            );
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
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
        votes[message.guild.id] = [];
        avote[message.guild.id] = [];
        voted[message.guild.id] = [];
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage.length === 2) {
            if (spliteMessage[1] === "jour") {
              message.delete();
              voteJour(message);
            } else {
              votedejour[message.guild.id] = false;
              message.delete();
              let votelist = spliteMessage[1].split(",");
              for (var i = 0; i < votelist.length; i++) {
                message.channel.send(votelist[i]).then(function(message) {
                  message.react("👎");
                  votes[message.guild.id].push(message);
                });
              }
            }
          } else {
            message.delete();
            message.channel.send(
              "Formulation incorrecte. La bonne syntaxe est : ``/vote [vote1],[vote2],[...],[voteN]``"
            );
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Commence la journée
      else if (spliteMessage[0] === prefix + "daystart") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[1] != null && spliteMessage[1].match(/^\d+$/)) {
            pouet[message.guild.id] = parseInt(spliteMessage[1]);
          } else {
            pouet[message.guild.id] = 5;
          }
          var finpouet = pouet[message.guild.id] * 60000;
          StateOfTheGame[message.guild.id][0] = Presets[theme[message.guild.id]].time.Day;

          message.delete();
          getRoleInDb("vivants", message);
          role = roleDB[message.guild.id];

          message.channel.overwritePermissions(role, { SEND_MESSAGES: true });
          unmute(role, message);
          message.channel.send("Une nouvelle journée commence. (" + StateOfTheGame[message.guild.id].join(" ") + ")");
          getPlaceInDb("votes", message);
          lieu = lieuDB[message.guild.id];
          getPlaceInDb("vocal", message);
          lieu2 = lieuDB[message.guild.id];
          if (lieu == null || lieu2 == null) {
            message.reply("Salon de vote ou vocal non défini");
          } else {
            message.guild.channels
              .get(lieu)
              .overwritePermissions(role, { VIEW_CHANNEL: true });
            unmute(role, message);
            x[message.guild.id] = setInterval(function() {
              message.channel.send(
                pouet[message.guild.id] + " minutes restantes."
              );
              pouet[message.guild.id] -= 1;
            }, 60000);
            y[message.guild.id] = setTimeout(function() {
              message.channel.send("30 secondes restantes.");
              clearInterval(x[message.guild.id]);
            }, finpouet - 30000);
            z[message.guild.id] = setTimeout(function() {
              message.channel.overwritePermissions(role, {
                SEND_MESSAGES: false
              });
              message.channel.send("La journée s'achève. Bonne nuit.");
              message.guild.channels
                .get(lieu)
                .overwritePermissions(role, { VIEW_CHANNEL: false });
              mute(role, message);
            }, finpouet);
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //prolongations
      else if (spliteMessage[0] === prefix + "prolong") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (spliteMessage[1] != null && spliteMessage[1].match(/^\d+$/)) {
            pouet[message.guild.id] = parseInt(spliteMessage[1]);
          } else {
            pouet[message.guild.id] = 90;
          }
          var finpouet = pouet[message.guild.id] * 6000;

          message.delete();
          message.channel.send(
            "Une égalité dans les votes mène toujours à des débats supplémentaires."
          );
          prolongations(message, finpouet)
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Achève la journée
      else if (spliteMessage[0] === prefix + "dayend") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          message.delete();
          endVote(message);
          getRoleInDb("vivants", message);
          role = roleDB[message.guild.id];
          getPlaceInDb("votes", message);
          lieu = lieuDB[message.guild.id];
          getPlaceInDb("vocal", message);
          lieu2 = lieuDB[message.guild.id];

          clearInterval(x[message.guild.id]);
          clearTimeout(y[message.guild.id]);
          clearTimeout(z[message.guild.id]);
          message.channel.overwritePermissions(role, { SEND_MESSAGES: false });
          message.guild.channels
            .get(lieu)
            .overwritePermissions(role, { VIEW_CHANNEL: false });
          mute(role, message);
          message.channel.send("La journée s'achève. Bonne nuit.");
          if(jourBE[message.guild.id]){
            var item;
            if(!IDVcache[message.guild.id]){
              item = findObjectInList(distribRoles[message.guild.id],"Role",IDV[message.guild.id])
            }
            banniDeVote[message.guild.id] = [item]
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Annonce une commande de nuit
      else if (spliteMessage[0] === prefix + "nuit") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          var themeuh = Presets[theme[message.guild.id]]
          StateOfTheGame[message.guild.id][0] = Presets[theme[message.guild.id]].time.Night;
          StateOfTheGame[message.guild.id][1] += 1

          var collectorLG;

          getPlaceInDb("loups", message);
          var lieu = message.guild.channels.get(lieuDB[message.guild.id]);

          getPlaceInDb("charmed", message);
          var lieu2 = message.guild.channels.get(lieuDB[message.guild.id]);

          getPlaceInDb("vocal", message);
          var vocal = message.guild.channels.get(lieuDB[message.guild.id]);

          getPlaceInDb("village", message);
          var village = message.guild.channels.get(lieuDB[message.guild.id]);

          getRoleInDb("vivants", message);
          var amute = message.guild.roles.get(roleDB[message.guild.id]);
          Listvivants[message.guild.id] = message.guild.roles
            .get(roleDB[message.guild.id])
            .members.map(m => m.user.username);

          village.overwritePermissions(amute, { SEND_MESSAGES: false });
          amute.members.forEach(mute => {
            mute.setMute(true);
          });

          vivants[message.guild.id] = "";
          for (var i = 0; i < distribRoles[message.guild.id].length; i++) {
            vivants[message.guild.id] +=
              "**" +
              (i + 1) +
              "**. " +
              distribRoles[message.guild.id][i].User.username +
              "\n";
          }

          var rolajouer = [];
          var messNuit;

          if (
            !potMort[message.guild.id] &&
            !potVie[message.guild.id] &&
            rolesDeNuit[message.guild.id].includes(Soso[message.guild.id])
          ) {
            rolesDeNuit[message.guild.id].splice(
              rolesDeNuit[message.guild.id].indexOf(Soso[message.guild.id]),
              1
            );
          }

          var embed = new Discord.RichEmbed()
            .setTitle(StateOfTheGame[message.guild.id].join(" "))
            .setDescription(
              "La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour."
            );
          rolesDeNuit[message.guild.id].forEach(role => {
            distribRoles[message.guild.id].forEach(gens => {
              if (role === gens.Role) {
                embed.addField(gens.Role, "N'a pas encore agi");
                rolajouer.push(gens.Role);
              }
            });
          });
          message.channel.send(embed).then(function(message) {
            messNuit = message;
          });

          collector = message.channel.createCollector(filter);
          collector.on("collect", message => {
            contenu = message.content.toLowerCase();
            var spliteMessage = contenu.split(" ");

            var embed2 = new Discord.RichEmbed()
              .setTitle(StateOfTheGame[message.guild.id].join(" "))
              .setDescription(
                "La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour."
              );

            //Action nocturne des Loups Garous
            if (IDlg[message.guild.id].includes(contenu) && rolajouer.includes(LG[message.guild.id])) {
              //JoueursLG[message.guild.id] est jamais attribué je crois
              joueursLG[message.guild.id].forEach(joueur => {
                lieu.overwritePermissions(joueur, { SEND_MESSAGES: true });
              });
              var chan;
              var pf = findObjectInList(distribRoles[message.guild.id],"Role",PF[message.guild.id])
              lieu.send(LG[message.guild.id] + " Réveillez-vous et dévorez !").then(message => {
                if(pf != undefined){
                collectorLG = message.channel.createCollector(filterLG)
                chan = pf.User.dmChannel;
                collectorLG.on("collect", mess => {
                  chan.send(`**[${LG[message.guild.id]}**]: ${mess.content}`)
                })
                }
              })

              rolajouer.splice(rolajouer.indexOf(LG[message.guild.id]), 1);
            }

            //Action nocturne du Cupidon
            else if (IDcupi[message.guild.id].includes(contenu) && rolajouer.includes(Cupi[message.guild.id])) {
              var item = findObjectInList(distribRoles[message.guild.id], "Role", Cupi[message.guild.id])
              var chan = item.User.dmChannel;

              chan.send(
                "Réveille toi, " + Cupi[message.guild.id] + " ! Quels joueurs vas-tu unir par les liens indestructibles de l'amour ? \n" +
                  vivants[message.guild.id] +
                  " \n *N'indiquez que les numéros sous la forme X-Y. Par exemple, ``1-3`` pour unir " +
                  distribRoles[message.guild.id][0].User.username +
                  " et " +
                  distribRoles[message.guild.id][1].User.username +
                  ".*"
              );
              var collectorLove = chan.createCollector(filter2);
              eux[message.guild.id] = [];

              collectorLove.on("collect", mess => {
                var splitemess = mess.content.toLowerCase().split("-");

                if (splitemess.length === 2) {
                  var Amoureux1 = parseInt(splitemess[0]);
                  var Amoureux2 = parseInt(splitemess[1]);

                  if (
                    !isNaN(Amoureux1) &&
                    !isNaN(Amoureux2) &&
                    0 < Amoureux1 &&
                    Amoureux1 <= Listvivants[message.guild.id].length &&
                    0 < Amoureux2 &&
                    Amoureux2 <= Listvivants[message.guild.id].length
                  ) {
                    eux[message.guild.id].push(
                      distribRoles[message.guild.id][Amoureux1 - 1]
                    );
                    eux[message.guild.id].push(
                      distribRoles[message.guild.id][Amoureux2 - 1]
                    );
                    Lovers[message.guild.id] = eux[message.guild.id];
                    chan.send(
                      "C'est fait. " +
                        eux[message.guild.id][0].User.username +
                        " et " +
                        eux[message.guild.id][1].User.username +
                        " sont désormais liés pour la vie... et la mort."
                    );
                    salonLog[message.guild.id].send(
                      "Les amoureux sont : " +
                        eux[message.guild.id][1].User.username +
                        " et " +
                        eux[message.guild.id][0].User.username +
                        "."
                    );
                    var amour = themeuh.Amour.split("|");
                    var chan2 = eux[message.guild.id][0].User.dmChannel;
                    chan2.send(
                      amour[0] +
                        eux[message.guild.id][1].User.username +
                        amour[1]
                    );
                    var chan3 = eux[message.guild.id][1].User.dmChannel;
                    chan3.send(
                      amour[0] +
                        eux[message.guild.id][0].User.username +
                        amour[1]
                    );
                    eux[message.guild.id] = [];
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
              rolesDeNuit[message.guild.id].splice(
                rolesDeNuit[message.guild.id].indexOf(Cupi[message.guild.id]),
                1
              );
              rolajouer.splice(rolajouer.indexOf(Cupi[message.guild.id]), 1);
            }

            //Action nocturne de la Voyante
            else if (IDvovo[message.guild.id].includes(contenu) && rolajouer.includes(Vovo[message.guild.id])) {
              rolajouer.splice(rolajouer.indexOf(Vovo[message.guild.id]), 1);
              var item = findObjectInList(distribRoles[message.guild.id], "Role", Vovo[message.guild.id])

              var chan = item.User.dmChannel;
              chan.send(
                "Réveille toi, " + Vovo[message.guild.id] + " ! De quel joueur veux-tu connaître le rôle cette nuit ? \n" +
                  vivants[message.guild.id] +
                  "*N'indiquez que le numéro du joueur, par exemple ``1`` pour voir le rôle de " +
                  distribRoles[message.guild.id][0].User.username +
                  ".*"
              );
              collector2 = chan.createCollector(filter2);
              collector2.on("collect", mess => {
                var cible = parseInt(mess);
                var lui = [];
                if (
                  !isNaN(cible) &&
                  0 < cible &&
                  cible <= Listvivants[message.guild.id].length
                ) {
                  lui.push(distribRoles[message.guild.id][cible - 1]);
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
              IDsoso[message.guild.id].includes(spliteMessage[0]) &&
              rolajouer.includes(Soso[message.guild.id])
            ) {
              //On s'attend à ce que le MJ indique en plus la victime des loups garous
              if (spliteMessage.length != 2) {
                //S'il ne l'a pas fait, on l'invite à le faire
                message.reply("Quel est la victime de la nuit ?");
              } else {
                //Sinon, tout va bien, on prend comme victime le membre mentionné
                rolajouer.splice(rolajouer.indexOf(Soso[message.guild.id]), 1);
                var previct = message.guild.member(
                  message.mentions.users.first()
                );
                //Si previct contient une valeur et non pas "personne"
                if (spliteMessage[1] != "personne" && previct != null) {
                  //La victime est désignée par son nom d'utilisateur
                  victime[message.guild.id] = previct.user.username;
                } else {
                  //Sinon, c'est personne
                  victime[message.guild.id] = " personne !";
                }
                var item = findObjectInList(distribRoles[message.guild.id], "Role", Soso[message.guild.id])
                var chan = item.User.dmChannel;
                var pots = "";
                var info = "";
                if (potVie[message.guild.id]) {
                  info =
                    "La victime des " + LG[message.guild.id] + " ce soir est **" +
                    victime[message.guild.id] +
                    "**, _veux tu la sauver ?_";
                  if (potMort[message.guild.id]) {
                    pots = themeuh.potions.Vie + " et " + themeuh.potions.Mort;
                  } else {
                    pots = themeuh.potions.Vie;
                  }
                } else if (
                  potMort[message.guild.id] &&
                  !potVie[message.guild.id]
                ) {
                  pots = themeuh.potions.Mort;
                }
                chan
                  .send(
                    "Réveille toi, " + Soso[message.guild.id] + " ! " +
                      info +
                      "\n Il te reste " +
                      pots +
                      "."
                  )
                  .then(function(mess) {
                    if (potVie[message.guild.id]) {
                      ConfSoso[message.guild.id] = mess;
                      mess.react("✅");
                      mess.react("❌");
                      const collectorSoso = mess.createReactionCollector(
                        filterSoso
                      );
                      collectorSoso.on("collect", reac => {
                        if (
                          potVie[message.guild.id] &&
                          !next[message.guild.id] &&
                          reac.count > 1
                        ) {
                          if (reac.emoji.name === "❌") {
                            reac.message.channel.send(
                              "Très bien. **" +
                                victime[message.guild.id] +
                                "** mourra."
                            );
                            salonLog[message.guild.id].send(
                              Soso[message.guild.id] + "n'a protégé personne."
                            );
                            next[message.guild.id] = true;
                            collectorSoso.stop();
                          } else if (reac.emoji.name === "✅") {
                            var sauvetage = themeuh.potions.Save.split("|");
                            reac.message.channel.send(
                              sauvetage[0] +
                                victime[message.guild.id] +
                                sauvetage[1]
                            );
                            salonLog[message.guild.id].send(
                              Soso[message.guild.id] + " a protégé **" +
                                victime[message.guild.id] +
                                "**, qui ne mourra pas cette nuit."
                            );
                            next[message.guild.id] = true;
                            potVie[message.guild.id] = false;
                            collectorSoso.stop();
                          } else {
                            console.log(reac.emoji.name);
                          }
                        }
                      });
                      collectorSoso.on("end", c => {
                        UsePotMort(mess, message.guild, themeuh);
                      });
                    } else UsePotMort(mess, message.guild, themeuh);
                  });
              }
            }

            //Action nocturne du Salvateur
            else if (IDsalva[message.guild.id].includes(contenu) && rolajouer.includes(Salva[message.guild.id])) {
              var item = findObjectInList(distribRoles[message.guild.id], "Role", Salva[message.guild.id])
              var chan = item.User.dmChannel;
              rolajouer.splice(rolajouer.indexOf(Salva[message.guild.id]), 1);

              chan.send(
                "Réveille toi, " + Salva[message.guild.id] + " ! Qui vas-tu protéger cette nuit ? \n" +
                  vivants[message.guild.id] +
                  "*N'indiquez que le numéro du joueur, par exemple ``1`` pour protéger " +
                  distribRoles[message.guild.id][0].User.username +
                  ".*"
              );
              collector2 = chan.createCollector(filter2);
              collector2.on("collect", mess => {
                var cible = parseInt(mess);
                var lui = [];
                if (
                  !isNaN(cible) &&
                  0 < cible &&
                  cible <= Listvivants[message.guild.id].length
                ) {
                  lui.push(distribRoles[message.guild.id][cible - 1]);
                  mess.channel.send(
                    "**" +
                      lui[0].User.username +
                      "** est protégé cette nuit. Aucun " + LG[message.guild.id] + " ne pourra lui faire du mal."
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
            else if (IDjdf[message.guild.id].includes(contenu) && rolajouer.includes(JDF[message.guild.id])) {
              var item = findObjectInList(distribRoles[message.guild.id], "Role", JDF[message.guild.id])
              var chan = item.User.dmChannel;
              var acharme = [];
              var acharmer = "";
              var welcome = themeuh.flute.Welcome.split("|");
              charmes[message.guild.id].forEach(charme => {
                distribRoles[message.guild.id].forEach(vivant => {
                  if (vivant.User.username != charme.user.username) {
                    acharme.push(vivant.User.username);
                  }
                });
              });
              if (acharme[0] === undefined) {
                for (
                  var i = 0;
                  i < distribRoles[message.guild.id].length;
                  i++
                ) {
                  acharme.push(distribRoles[message.guild.id][i].User.username);
                }
              }
              for (var i = 0; i < acharme.length; i++) {
                acharmer += "**" + (i + 1) + "**. " + acharme[i] + "\n";
              }
              
              chan.send(
                "Réveille toi, " + JDF[message.guild.id] + welcome[0] + " \n" +
                  acharmer +
                  "*N'indiquez que les numéros sous la forme X-Y. Par exemple, ``1-2`` pour " + welcome[1] +
                  acharme[0] +
                  " et " +
                  acharme[1] +
                  ". Si vous ne souhaitez " + welcome[1] + " qu'une personne, écrivez sous la forme ``X-0``. Si vous ne souhaitez " + welcome[1] + " personne, écrivez ``0``. \n (Attention, si jamais vous écrivez ``0-X`` par exemple, personne ne sera " + welcome[2] + ".)*"
              );

              collector2 = chan.createCollector(filter2);
              collector2.on("collect", mess => {
                if (mess[0] == "0") {
                  mess.channel.send(
                    "Personne ne sera " + welcome[1] + " cette nuit."
                  );
                  salonLog[message.guild.id].send(
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
                  eux.push(distribRoles[message.guild.id][cible1 - 1]);
                  var eux2 = "c'est tout";
                  if (cible2 != 0)
                    eux2 =
                      distribRoles[message.guild.id][cible2 - 1].User.username;
                  mess.channel.send(
                    "**" +
                      eux[0].User.username +
                      "** et **" +
                      eux2 +
                      themeuh.flute.Charme
                  );
                  logs.send(
                    item[2] +
                      " a " + welcome[2] + " les joueurs " +
                      eux[0][2] +
                      " et " +
                      eux2
                  );
                  Charme(message, eux[0][0], welcome);
                  if (cible2 != 0)
                    Charme(
                      message,
                      distribRoles[message.guild.id][cible2 - 1].GuildMember, welcome
                    );
                  collector2.stop();
                } else {
                  mess.channel.send(
                    "Woof ! Merci d'indiquer un chiffre parmi ceux proposés ! "
                  );
                }
              });
              rolajouer.splice(rolajouer.indexOf(JDF[message.guild.id]), 1);
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
              if(collectorLG != undefined){
              collectorLG.stop()
              }
            }

            messNuit.edit(embed2);
          });
          collector.on("end", collected => {
            message.channel.send("Collecteur terminé.");
          });
        }
      }

      //Détermine un rôle pour la prochaine partie
      else if (spliteMessage[0] === prefix + "theme"){
        if(adminlist.includes(message.author) || mini[message.guild.id]){
          message.delete();
          if(!gameOn[message.guild.id]){
          if(spliteMessage[1] != null){
            if(Presets[spliteMessage[1]] != undefined){
              theme[message.guild.id] = spliteMessage[1];
              message.channel.send("Thème de la prochaine partie : " + spliteMessage[1]);
            }
            else{
              message.reply("Merci d'indiquer un thème valide")
            }
          }
          else{
            message.reply("Merci de préciser le thème désiré !")
          }
        }
        else{
          message.reply("Impossible de changer le thème lorsqu'une partie est en cours !")
        }
        }
        else{
          message.reply("Seuls les administrateurs peuvent déterminer le thème de la prochaine partie.")
        }
      }

      //Prépare la composition de la partie
      else if (spliteMessage[0] === prefix + "compo") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          //Définie un thème pour la partie. Par défaut, il s'agit du thème classique.
          var themeAct = new Theme().preset(theme[message.guild.id])
          gameOn[message.guild.id] = true;
          message.delete();
          compo[message.guild.id] = [];
          var embed = new Discord.RichEmbed()
            .setTitle("Composition de la partie :")
            .setDescription(
              "Préparez la composition de la partie à l'aide des commandes ci-dessous."
            )
            .addField("Le thème sélectionné pour cette partie est le thème **" + themeAct.name + "**. ", themeAct.description)
            .addField(
              "**__Informations__**",
              " Vous pouvez ajouter des rôles en tapant ``+ [rôle] [nombre]`` et en retirer en tapant ``- [rôle] [nombre]``. Par défaut, le nombre est de 1.\n Vous pouvez vérifier la liste des rôles reconnus en tapant ``roles?``, annuler en tapant ``annuler``, et si vous avez terminé, tapez ``terminé``."
            );

          setTheme(themeAct,message)
          message.channel.send(embed);
          collector2 = message.channel.createCollector(filter);
          prepCompo(collector2);
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      }

      //Envoie les rôles à tous les inscrits
      else if (spliteMessage[0] === prefix + "distribution") {
        if (
          adminlist.includes(message.author) ||
          mini[message.guild.id] === true
        ) {
          if (compoDone[message.guild.id]) {
            Distribution(message);
          }
          else{
            message.reply("La composition n'est pas terminée !")
          }
        } else {
          message.delete();
          message.reply(
            "Désolé, cette commande est réservée aux maîtres du jeu."
          );
        }
      } else if (spliteMessage[0] === prefix + "charme") {
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
          let tempo = message.channel.send(
            "Tous les décomptes ont été interrompus."
          );
          setTimeout(tempo.delete(), 5000);
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
        function sendHelp(){
        for(var theme in Presets){
          var role = Presets[theme].roles;
          for(var i = 0; i < role.length; i++){
            if(role[i].Id.split(",").includes(contenu)){
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
          if(message.channel.type === "dm"){
            message.channel.send("Utilisez cette commande dans un serveur pour avoir la liste des commandes que vous pouvez utiliser sur ce serveur.")
          }
          var lui = message.author;
          helpGen(message, lui);
        }
      }

      //Suggestions
      else if(spliteMessage[0] === prefix + "suggestion"){
        spliteMessage.splice(0,1)
        var contenu = spliteMessage.join(" ");
        bot.fetchUser("218701822670405633").then(moi => {
        var embed = new Discord.RichEmbed()
          .setTitle("Nouvelle suggestion")
          .setDescription("Suggestion de " + message.author.tag)
          .setThumbnail(message.author.avatarURL)
          .addField("Suggestion :",contenu)
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
          var item = findObjectInList(distribRoles[reac.message.guild.id],"GuildMember",lui)
          var luiroles = reac.message.guild.members
            .get(lui.id)
            .roles.map(r => r.id);
          if(banniDeVote[reac.message.guild.id].includes(item)){
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
            var item2 = findObjectInList(voted[reac.message.guild.id],"contenu",reac.message.content)
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
          var item = findObjectInList(voted[reac.message.guild.id],"contenu",reac.message.content)
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

function UsePotMort(message, guild, theme) {
  if (potMort[guild.id]) {
    message.channel.send(
      "Sur qui souhaites-tu utiliser " + theme.potions.Mort + " ? \n**0.** Personne\n" +
        vivants[guild.id] +
        "*N'indiquez que le numéro du joueur, par exemple ``0`` pour ne tuer personne.*"
    );
    var filter = m => inscrits[guild.id].includes(m.author.id);
    var collector2 = message.channel.createCollector(filter);
    collector2.on("collect", mess => {
      var cible = parseInt(mess);
      var lui = [];
      if (!isNaN(cible) && 0 < cible && cible <= Listvivants[guild.id].length) {
        lui.push(distribRoles[guild.id][cible - 1]);
        if (lui[0] === undefined) {
          console.log("erreur avec cible = " + cible);
        } else {
          var meurtre = theme.potions.Kill.split("|");
          mess.channel.send(
            meurtre[0] +
              lui[0][2].username +
              meurtre[1]
          );
          salonLog[guild.id].send(
            Soso[guild.id] + " a décidé de tuer **" + lui[0][2] + "**."
          );
          potMort[guild.id] = false;
          collector2.stop();
        }
      } else if (cible == 0) {
        mess.channel.send(
          "Tu décides que ce n'est pas encore le moment. Peut être une prochaine fois."
        );
        salonLog[guild.id].send(Soso[guild.id] + " n'a voulu tuer personne.");
        collector2.stop();
      }
    });
  }
}

function prepCompo(collector) {
  collector.on("collect", message => {
    const filter = m =>
      m.author === message.author || adminlist.includes(m.author);
    splitemess = message.content.toLowerCase().split(" ");
    var qte = 1;
    var pluriel = "";

    if (!isNaN(parseInt(splitemess[2]))) {
      if (parseInt(splitemess[2]) > 1) {
        pluriel = "s";
      }
      qte = parseInt(splitemess[2]);
    }

    if (splitemess[0] === "+") {
      if (IDlg[message.guild.id].includes(splitemess[1])) {
        onAddRole(LG[message.guild.id], emoteLG[message.guild.id]);
      } else if (IDcupi[message.guild.id].includes(splitemess[1])) {
        onAddRole(Cupi[message.guild.id], emoteCupi[message.guild.id]);
      } else if (IDsalva[message.guild.id].includes(splitemess[1])) {
        onAddRole(Salva[message.guild.id], emoteSalva[message.guild.id]);
      } else if (IDsoso[message.guild.id].includes(splitemess[1])) {
        onAddRole(Soso[message.guild.id], emoteSoso[message.guild.id]);
      } else if (IDancien[message.guild.id].includes(splitemess[1])) {
        onAddRole(Ancien[message.guild.id], emoteAncien[message.guild.id]);
      } else if (IDchassou[message.guild.id].includes(splitemess[1])) {
        onAddRole(Chassou[message.guild.id], emoteChassou[message.guild.id]);
      } else if (IDidv[message.guild.id].includes(splitemess[1])) {
        onAddRole(IDV[message.guild.id], emoteIDV[message.guild.id]);
      } else if (IDjdf[message.guild.id].includes(splitemess[1])) {
        onAddRole(JDF[message.guild.id], emoteJDF[message.guild.id]);
      } else if (IDvovo[message.guild.id].includes(splitemess[1])) {
        onAddRole(Vovo[message.guild.id], emoteVovo[message.guild.id]);
      } else if (IDsv[message.guild.id].includes(splitemess[1])) {
        onAddRole(SV[message.guild.id], emoteSV[message.guild.id]);
      } else if (IDbe[message.guild.id].includes(splitemess[1])) {
        onAddRole(BE[message.guild.id], emoteBE[message.guild.id])
      } else if (IDpf[message.guild.id].includes(splitemess[1])){
        onAddRole(PF[message.guild.id], emotePF[message.guild.id])
      }
      else {
        nbRole[message.guild.id] -= qte;
      }
      nbRole[message.guild.id] += qte;
      message.delete();
    } else if (splitemess[0] === "-") {
      if (IDlg[message.guild.id].includes(splitemess[1])) {
        onSuppRole(LG[message.guild.id]);
      } else if (IDcupi[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Cupi[message.guild.id]);
      } else if (IDsalva[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Salva[message.guild.id]);
      } else if (IDsoso[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Soso[message.guild.id]);
      } else if (IDancien[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Ancien[message.guild.id]);
      } else if (IDchassou[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Chassou[message.guild.id]);
      } else if (IDidv[message.guild.id].includes(splitemess[1])) {
        onSuppRole(IDV[message.guild.id]);
      } else if (IDjdf[message.guild.id].includes(splitemess[1])) {
        onSuppRole(JDF[message.guild.id]);
      } else if (IDvovo[message.guild.id].includes(splitemess[1])) {
        onSuppRole(Vovo[message.guild.id]);
      } else if (IDsv[message.guild.id].includes(splitemess[1])) {
        onSuppRole(SV[message.guild.id]);
      } else if (IDbe[message.guild.id].includes(splitemess[1])) {
        onSuppRole(BE[message.guild.id], emoteBE[message.guild.id])
      } else if (IDpf[message.guild.id].includes(splitemess[1])){
        onSuppRole(PF[message.guild.id], emotePF[message.guild.id])
      } else {
        nbRole[message.guild.id] += qte;
      }
      nbRole[message.guild.id] -= qte;
      message.delete();
    } else if (message.content === "roles?") {
      message.channel.send("**Liste des rôles reconnus **: \n" + listeRoles[message.guild.id]);
    } else if (message.content === "annuler") {
      collector.stop();
      compo[message.guild.id] = [];
      message.channel.send("Composition de la partie annulée.");
    } else if (message.content === "check") {
      message.channel.send(
        "__Composition actuelle de la partie__ : " + compo[message.guild.id]
      );
    } 
    else if (message.content === "terminé") {
      //S'il y a moins de rôles attribués que d'inscrits
      if (nbRole[message.guild.id] < inscrits[message.guild.id].length) {
        var diffSV = inscrits[message.guild.id].length - nbRole[message.guild.id];
        message.channel.send(
          "Il n'y a pas assez de rôles pour tout le monde. **" +
            diffSV +
            "** joueurs seront de **Simples Villageois**, continuer ? (Oui/Non)"
        );
        //attente de la réponse
        collector11 = message.channel.createCollector(filter);
        collector11.on("collect", message => {
          //Si c'est validé, on complète la composition avec de simples villageois
          if (message.content === "oui" || message.content === "o") {
            //Et on peut arrêter le collecteur de la composition ainsi que celui-là
            collector.stop();
            collector11.stop();

            //La grammaire, très important
            if (diffSV > 1) {
              pluriel = "s";
            }
            //Fill de la composition
            qte = diffSV;
            onAddRole(SV[message.guild.id], emoteSV[message.guild.id]);
            annonceCompo(message);
          } else if (message === "non" || message === "n") {
            message.channel.send("Il reste " + diffSV + " rôles à attribuer.");
            collector11.stop();
          }
        });
      } else if (nbRole[message.guild.id] > inscrits[message.guild.id].length) {
        var diff = nbRole[message.guild.id] - inscrits[message.guild.id].length;
        message.channel.send(
          "Il y a trop de rôles par rapport au nombre d'inscrits. Veuillez retirer **" +
            diff +
            "** rôles en utilisant ``- [rôle] [nombre]``"
        );
      } else {
        collector.stop();
        annonceCompo(message);
      }

      function annonceCompo(message) {
        //Préparation du message final
        var embed = new Discord.RichEmbed()
          .setTitle("Composition de la partie")
          .setDescription(
            "Composition pour une partie de **" +
              nbRole[message.guild.id] +
              "** joueurs."
          )
          .setThumbnail(
            "https://images.ecosia.org/usDAmTwJGwk-iLDbV9SuUYP6Tz4=/0x390/smart/http%3A%2F%2Fgusandcodotnet.files.wordpress.com%2F2011%2F03%2Floups-garous-loup-large.jpg"
          );
        //Va, pour chaque rôle présent dans la liste compo, créer un champs pour l'afficher
        compo[message.guild.id].forEach(role => {
          embed.addField(
            role.Quantite +
              " " +
              role.Name,
            role.Emote
          );
        });
        message.channel.send(embed);
        message.channel.send(
          "Pour envoyer la composition dans le salon de discussion du jour, tapez ``send``. Elle y sera aussi épinglée et les rôles automatiquement distribués. Sinon, tapez ``fin``."
        );
        compoDone[message.guild.id] = true;
        //Création d'un collecteur pour attendre la réponse
        collector22 = message.channel.createCollector(filter);
        collector22.on("collect", message => {
          //Si c'est validé
          if (message.content === "send") {
            //On récupère le salon de la place du village
            getPlaceInDb("village", message);
            lieu = lieuDB[message.guild.id];
            //Et on y envoie l'embed
            message.guild.channels
              .get(lieu)
              .send(embed)
              .then(function(message) {
                //Avant de la pin, et de récupérer le message pour pouvoir l'unpin
                message.pin();
                messCompo = message;
                collector22.stop();
                //Et on lance la distribution des rôles
                Distribution(message)
              });
          } else if (message.content === "fin") {
            collector22.stop();
          } else {
            message.channel.send("Veuillez répondre avec ``send`` ou ``fin``");
          }
        });
      }
    } else {
      message.channel.send(
        "Commande non reconnue. Veuillez réessayer, ou ``annuler`` pour quitter."
      );
    }

    function onAddRole(role, emote) {
      if (compo[message.guild.id].length === 0) {
        compo[message.guild.id].push({Name: role, Quantite: qte, Emote: emote});
      } else {
        var i = 0;
        compo[message.guild.id].forEach(Role => {
          if (Role.Name === role) {
            var item = findObjectInList(compo[message.guild.id],"Name",Role);
            item.Quantite += 1;
          } else {
            i++;
          }
        });
        if (i === compo[message.guild.id].length) {
          compo[message.guild.id].push({Name: role, Quantite: qte, Emote: emote});
        }
      }

      message.channel.send(
        "**" +
          qte +
          " " +
          role +
          pluriel +
          "** ajouté" +
          pluriel +
          " à la composition de la partie."
      );
    }
function onSuppRole(role) {
  compo[message.guild.id].forEach(Role => {
    if (Role.Name === role) {
      var item = findObjectInList(compo[message.guild.id],"Name",Role);
            item.Quantite -= 1;
      if (item.Quantite <= 0) {
        compo[message.guild.id].splice(
          compo[message.guild.id].indexOf(item),1
        );
        }
      }
  });
  
  message.channel.send(
    "**" +
      qte +
      " " +
      role +
      pluriel +
      "** supprimé" +
      pluriel +
      " de la composition de la partie."
  );
}
  });
}
  

function Charme(message, lui, welcome) {
  getPlaceInDb("charmed", message);
  lieu = lieuDB[message.guild.id];

  message.guild.channels
    .get(lieu)
    .overwritePermissions(lui, { VIEW_CHANNEL: true, SEND_MESSAGES: false });
  message.guild.channels.get(lieu).send(lui + " vient de se faire " + welcome[1] + " !");
  charmes[message.guild.id].push(lui);
}

function reviveAll(message) {
  getRoleInDb("morts", message);
  role = roleDB[message.guild.id];

  eux = message.guild.roles.get(role).members;
  eux.forEach(lui => {
    setTimeout(() => {
      getRoleInDb("vivants", message);
      role2 = roleDB[message.guild.id];
      lui.addRole(role2);
    }, 500);
    lui.setMute(false);
    //Retirer le rôle en deuxième pour éviter de déco les joueurs portable
    setTimeout(() => {
      lui.removeRole(role);
    }, 1000);
  });
  console.log("Réussite du reviveall");
}

function mute(role, message) {
  message.guild.roles.get(role).members.forEach(membre => {
    membre.setMute(true);
  });
}

function unmute(role, message) {
  message.guild.roles.get(role).members.forEach(membre => {
    membre.setMute(false);
  });
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
  lieu3 = lieuDB[message.guild.id];

  var item = findObjectInList(distribRoles[message.guild.id],"GuildMember",lui)
  if (item != undefined) {
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

  lui.setMute(true);
  message.guild.channels.get(lieu).send(lui + " est mort" + rolmort);
  getPlaceInDb("charmed", message);
  lieu2 = lieuDB[message.guild.id];

  message.guild.channels
    .get(lieu2)
    .overwritePermissions(lui, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

  if (Lovers[message.guild.id].includes(item)) {
    var dead = Presets[theme[message.guild.id]].amour.OnDeath.split("|")
    Lovers[message.guild.id].splice(Lovers[message.guild.id].indexOf(item), 1);
    message.guild.channels
      .get(lieu)
      .send(
        dead[0] +
          Lovers[message.guild.id][0].User +
          dead[1]
      ).then(mess =>{
    var amorreux = Lovers[message.guild.id][0];
    Lovers[message.guild.id] = [];
    Kill(mess, amorreux);
      })
  }
}

function endVote(message){
  var pendu = {user : null, votes : -1, contenu  : "personne"}
  var egalite = false;
  getPlaceInDb("village", message);
  var village = message.guild.channels.get(lieuDB[message.guild.id]);

  voted[message.guild.id].forEach(vote => {
    if(vote.votes > pendu.votes && vote.votes != 0){
      pendu = vote;
      egalite = false;
    }
    else if(vote.votes === pendu.votes){
      pendu.user = pendu.user + " " + vote.user
      pendu.contenu = pendu.contenu + " " + vote.user
      egalite = true;
    }
    console.log("Vote maximal : " + pendu.votes + ", vote proposé " + vote.votes)
  })

  if(pendu.votes === -1){
    egalite = true;
  }

  if(egalite){
    if(distribRoles[message.guild.id].map(getItem).includes(BE[message.guild.id])){
      var bouc = findObjectInList(distribRoles[message.guild.id],"Role",BE[message.guild.id]);
      console.log(bouc)
      console.log(BE[message.guild.id]);
      village.send(`Vous hésitez, ne sachant trop que faire. Puis tous les regards convergent vers le ${bouc.GuildMember}. Le ${bouc.Role}, il n'y a qu'à l'éliminer lui ! \n *Il va décider qui pourra voter le lendemain.*`)
      Kill(message,bouc.GuildMember)
      deathBE(message,bouc)
    } else {
      if(pendu.user != null){
        village.send(`Vous n'avez pas pu vous décider, il y aura donc des prolongations (1min30).`).then(message => {
        voteJour(message,pendu.user.join(" "));
        prolongations(message,90000)
      })
    } 
    else
      village.send("Aucun vote ? Quelle déception...")
  }
  function getItem(item){
    return item.Role;
  }
  }
  else{
    village.send(`Après concertation, il est clair que ${pendu.contenu} était indigne de vivre.`)
    var item = findObjectInList(distribRoles[message.guild.id], "User", pendu.user)
    if(item.Role === IDV[message.guild.id] && IDVcache[message.guild.id]){
      village.send(`Au moment d'éliminer ${pendu.contenu}, il devient clair qu'il est en fait ${item.Role} ! Quelqu'un comme lui n'a aucune chance d'être ${LG[message.guild.id]}. Mais d'un autre côté, le vote de quelqu'un comme lui n'a aucune valeur désormais...`);
      banniDeVote[message.guild.id].push(item);
      IDVcache[message.guild.id] = false;
      return;
    }
    Kill(message,item.GuildMember)
  }
}

function deathBE(message,item){
var chan = item.User.dmChannel;
const filter2 = m => inscrits[message.guild.id].includes(m.author.id);
              chan.send(
                "Tu as été éliminé par défaut, " + BE[message.guild.id] + " ! Mais dans ton dernier souffle, tu peux décider qui est digne de voter demain. \n **0.** Personne \n" +
                  vivants[message.guild.id] +
                  " \n *N'indiquez que les numéros sous la forme X-Y-... Par exemple, ``1-2`` pour permettre à " +
                  distribRoles[message.guild.id][0].User.username +
                  " et " +
                  distribRoles[message.guild.id][1].User.username +
                  " de voter.*"
              );
              var collector = chan.createCollector(filter2);
              eux[message.guild.id] = [];

              collector.on("collect", mess => {
                var choix = [];
                var splitemess = mess.content.toLowerCase().split("-");
                for(var i =0; i < splitemess.length; i++){
                  choix.push(distribRoles[message.guild.id][splitemess[i] - 1])
                }
                var reply = choix.map(getUser).join(", ");
                mess.channel.send("Voici ceux qui peuvent voter demain : " + reply)

                var annonce = choix.map(getMember).join(", ")
                message.channel.send(`Le ${BE[message.guild.id]} a choisi dans son dernier souffle. Seuls ${annonce} pourront voter demain.`)
                banniDeVote[message.guild.id].concat(choix);
                console.log(banniDeVote[message.guild.id]);
                console.log(choix)
                jourBE[message.guild.id] = true
                collector.stop();
              })
              function getUser(item){
                return item.User.username;
              }
              function getMember(item){
                return item.GuildMember;
              }
}

function setTheme(theme,message){
  theme.roles.forEach(role => {
    if(role.nuit){
      rolesDeNuit[message.guild.id].push(role.name);
    }
    listeRoles[message.guild.id].push(role.name)
    switch (role.title) {
      case "Loup-Garou":
          LG[message.guild.id] = role.name
          IDlg[message.guild.id] = role.ID;
          emoteLG[message.guild.id] = role.emote;
          break;
        case "Simple Villageois":
          SV[message.guild.id] = role.name
          IDsv[message.guild.id] = role.ID;
          emoteSV[message.guild.id] = role.emote;
          break;
        case "Cupidon":
          Cupi[message.guild.id] = role.name
          IDcupi[message.guild.id] = role.ID;
          emoteCupi[message.guild.id] = role.emote;
          break;
        case "Salvateur":
          Salva[message.guild.id] = role.name
          IDsalva[message.guild.id] = role.ID;
          emoteSalva[message.guild.id] = role.emote;
          break;
        case "Chasseur":
          Chassou[message.guild.id] = role.name
          IDchassou[message.guild.id] = role.ID;
          emoteChassou[message.guild.id] = role.emote;
          break;
        case "Sorcière":
          Soso[message.guild.id] = role.name
          IDsoso[message.guild.id] = role.ID;
          emoteSoso[message.guild.id] = role.emote;
          break;
        case "Voyante":
          Vovo[message.guild.id] = role.name
          IDvovo[message.guild.id] = role.ID;
          emoteVovo[message.guild.id] = role.emote;
          break;
        case "Idiot Du Village":
          IDV[message.guild.id] = role.name
          IDidv[message.guild.id] = role.ID;
          emoteIDV[message.guild.id] = role.emote;
          break;
        case "Joueur De Flûte":
          JDF[message.guild.id] = role.name
          IDjdf[message.guild.id] = role.ID;
          emoteJDF[message.guild.id] = role.emote;
          break;
        case "Ancien":
          Ancien[message.guild.id] = role.name
          IDancien[message.guild.id] = role.ID;
          emoteAncien[message.guild.id] = role.emote;
          break;
        case "Bouc émissaire":
          BE[message.guild.id] = role.name
          IDbe[message.guild.id] = role.ID;
          emoteBE[message.guild.id] = role.emote;
          break;
        case "Petite Fille":
          PF[message.guild.id] = role.name;
          IDpf[message.guild.id] = role.ID;
          emotePF[message.guild.id] = role.emote;
          break;
    
      default:
        throw new ReferenceError("Erreur dans le titre du rôle.")
        break;
    }
  });
}

function voteJour(message, egalite = null) {
  votes[message.guild.id] = [];
  avote[message.guild.id] = [];
  voted[message.guild.id] = [];
  votedejour[message.guild.id] = true;

  getRoleInDb("vivants", message);
  Jvivants = roleDB[message.guild.id];

  getPlaceInDb("votes", message);
  lieu = lieuDB[message.guild.id];

  var vivants;

  if(egalite === null){
    vivants = Array.from(
      message.guild.roles.get(Jvivants).members.values()
    );
  }
  else{
    egalite.forEach(user => {
      vivants.push(message.guild.members.get(user));
    })
  }
  for (var i = 0; i < vivants.length; i++) {
    var temp = vivants[i].user
    message.guild.channels
      .get(lieu)
      .send(" " + vivants[i])
      .then(function(mess) {
        mess.react("👎");
        votes[message.guild.id].push(mess);
        voted[message.guild.id].push({user : temp, votes : 0, contenu : mess.content})
      });
  }
}

function getRoleInDb(role, message) {
  junk = [];
  while (true) {
    var truc = db
      .get(`roles`)
      .map("id")
      .value()
      .indexOf(role, truc);
    if (truc === -1) {
      break;
    } else {
      junk.push(truc);
      truc += 1;
    }
  }
  junk.forEach(minijunk => {
    if (db.get(`roles[${minijunk}].guild`).value() === message.guild.id) {
      roleDB[message.guild.id] = db
        .get(`roles[${minijunk}].story_value`)
        .value();
      return db.get(`roles[${minijunk}].story_value`).value();
    } else {
      return false;
    }
  });
}

function getPlaceInDb(salon, message) {
  var junk = [];
  while (true) {
    var truc = db
      .get(`salons`)
      .map("id")
      .value()
      .indexOf(salon, truc);
    if (truc === -1) {
      break;
    } else {
      junk.push(truc);
      truc += 1;
    }
  }
  junk.forEach(minijunk => {
    if (db.get(`salons[${minijunk}].guild`).value() === message.guild.id) {
      lieuDB[message.guild.id] = db
        .get(`salons[${minijunk}].story_value`)
        .value();
      return lieuDB[message.guild.id];
    } else {
      return false;
    }
  });
}

function prolongations(message,finpouet){
  getRoleInDb("vivants", message);
          role = roleDB[message.guild.id];
          message.channel.overwritePermissions(role, { SEND_MESSAGES: true });
          getPlaceInDb("votes", message);
          lieu = lieuDB[message.guild.id];
          getPlaceInDb("vocal", message);
          lieu2 = lieuDB[message.guild.id];
          message.guild.channels
            .get(lieu)
            .overwritePermissions(role, { VIEW_CHANNEL: true });
          unmute(role, message);
          var limite = 90;
          x[message.guild.id] = setInterval(function() {
            message.channel.send(
              limite + " secondes restantes."
            );
            limite -= 30;
          }, 30000);
          z[message.guild.id] = setTimeout(function() {
            message.channel.overwritePermissions(role, {
              SEND_MESSAGES: false
            });
            message.channel.send("La journée s'achève. Bonne nuit.");
            message.guild.channels
              .get(lieu)
              .overwritePermissions(role, { VIEW_CHANNEL: false });
            mute(role, message);
            clearInterval(x[message.guild.id]);
          }, finpouet);
}

function findObjectInList(list,property,name){
  var temp = list.find((item) =>{
    return item[property] === name;
  })
  if(temp != undefined){
  return temp;
  }
  else{
    return undefined;
    throw new ReferenceError("L'objet n'a pas été trouvé dans  la liste. Détail : Propriétée fournie : " + property + ", objet recherché : " + name)
  }
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

function Distribution(message){
  
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
    var item = findObjectInList(compo[message.guild.id],"Name",role.Name);
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
      GuildMember : joueur,
      Role : roleRND,
      User : joueur.user,
      Victoire : "Partie toujours en cours"
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
          var item = findObjectInList(distribRoles[mess.guild.id],"GuildMember",joueur)
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

function checkmin(message) {
  if (message.channel.type != "dm") {
    var lui = db
      .get("ministrateurs")
      .map("story_value")
      .value()
      .toString();
    if (lui.includes(message.author)) {
      var lui2 = db
        .get("ministrateurs")
        .map("story_value")
        .value()
        .indexOf(message.author.toString());
      if (db.get(`ministrateurs[${lui2}].guild`).value() === message.guild.id) {
        mini[message.guild.id] = true;
      }
    }
  }
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

let poem =
  "Quand la lune blanche \nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir,\nFol alors qui livre\nA la nuit son livre\nSavant,\nSon pied aux collines,\nEt ses mandolines\nAu vent ;\nFol qui dit un conte,\nCar minuit qui compte\nLe temps,\nPasse avec le prince\nDes sabbats qui grince\nDes dents.\nL’amant qui compare\nQuelque beauté rare\nAu jour,\nTire une ballade\nDe son coeur malade\nD’amour.\nMais voici dans l’ombre\nQu’une ronde sombre\nSe fait,\nL’enfer autour danse,\nTous dans un silence\nParfait.\nTout pendu de Grève,\nTout Juif mort soulève\nSon front,\nTous noyés des havres\nPressent leurs cadavres\nEn rond.\nEt les âmes feues\nJoignent leurs mains bleues\nSans os ;\nLui tranquille chante\nD’une voix touchante\nSes maux.\nMais lorsque sa harpe,\nOù flotte une écharpe,\nSe tait,\nIl veut fuir… La danse\nL’entoure en silence\nParfait.\nLe cercle l’embrasse,\nSon pied s’entrelace\nAux morts,\nSa tête se brise\nSur la terre grise !\nAlors\nLa ronde contente,\nEn ris éclatante,\nLe prend ;\nTout mort sans rancune\nTrouve au clair de lune\nSon rang.\nCar la lune blanche\nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir.\nAlfred de Musset, Poésies posthumes";
