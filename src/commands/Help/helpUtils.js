const Embed = require("./src/commands/embeds");
const Discord = require("discord.js");

var methods = {
  helpGen: function(message, lui) {
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
              this.helpAdmin(message, lui);
              break;
            case "🎮":
              collectorHelp.stop();
              this.helpGameGen(message, lui);
              break;
            case "🛠️":
              collectorHelp.stop();
              this.helpTools(message, lui);
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
              this.helpAdmin(message, lui);
              break;
            case "🎮":
              collectorHelp.stop();
              this.helpGameGen(message, lui);
              break;
            case "🛠️":
              collectorHelp.stop();
              this.helpTools(message, lui);
              break;

            default:
              break;
          }
        });
      });
    }
  },

   helpAdmin: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpAdmin1).then(message => {
      message.react("◀️");
      var collectorHadmin = message.createReactionCollector(filter);
      collectorHadmin.on("collect", reac => {
        if (reac.emoji.name === "◀️") {
          collectorHadmin.stop();
          this.helpGen(message, lui);
        }
      });
    });
  },
  
   helpGameGen: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpGameGen).then(message => {
      message.react("1️⃣");
      message.react("2️⃣");
      message.react("3️⃣");
      message.react("◀️");
      var collectorGG = message.createReactionCollector(filter);
      collectorGG.on("collect", reac => {
        switch (reac.emoji.name) {
          case "1️⃣":
            collectorGG.stop();
            this.helpGameOne(message, lui);
            break;
          case "2️⃣":
            collectorGG.stop();
            this.helpGameTwo(message, lui);
            break;
          case "3️⃣":
            collectorGG.stop();
            this.helpGameThree(message, lui);
            break;
          case "◀️":
            collectorGG.stop();
            this.helpGen(message, lui);
            break;
  
          default:
            break;
        }
      });
    });
  },
  
   helpGameOne: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpGame1).then(message => {
      message.react("◀️");
      message.react("2️⃣");
      message.react("3️⃣");
      var collectorG1 = message.createReactionCollector(filter);
      collectorG1.on("collect", reac => {
        switch (reac.emoji.name) {
          case "◀️":
            collectorG1.stop();
            this.helpGameGen(message, lui);
            break;
          case "2️⃣":
            collectorG1.stop();
            this.helpGameTwo(message, lui);
            break;
          case "3️⃣":
            collectorG1.stop();
            this.helpGameThree(message, lui);
            break;
  
          default:
            break;
        }
      });
    });
  },
  
   helpGameTwo: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpGame2).then(message => {
      message.react("◀️");
      message.react("1️⃣");
      message.react("3️⃣");
      message.react("⚠️");
      var collectorG2 = message.createReactionCollector(filter);
      collectorG2.on("collect", reac => {
        switch (reac.emoji.name) {
          case "◀️":
            collectorG2.stop();
            this.helpGameGen(message, lui);
            break;
          case "1️⃣":
            collectorG2.stop();
            this.helpGameOne(message, lui);
            break;
          case "3️⃣":
            collectorG2.stop();
            this.helpGameThree(message, lui);
            break;
          case "⚠️":
            collectorG2.stop();
            this.helpGameWeird(message, lui);
            break;
  
          default:
            break;
        }
      });
    });
  },
  
   helpGameWeird: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpGame2Chelou).then(message => {
      message.react("◀️");
      var collectorGW = message.createReactionCollector(filter);
      collectorGW.on("collect", reac => {
        if (reac.emoji.name === "◀️") {
          collectorGW.stop();
          this.helpGameTwo(message, lui);
        }
      });
    });
  },
  
   helpGameThree: function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpGame3).then(message => {
      message.react("◀️");
      message.react("1️⃣");
      message.react("2️⃣");
      var collectorG3 = message.createReactionCollector(filter);
      collectorG3.on("collect", reac => {
        switch (reac.emoji.name) {
          case "◀️":
            collectorG3.stop();
            this.helpGameGen(message, lui);
            break;
          case "1️⃣":
            collectorG3.stop();
            this.helpGameOne(message, lui);
            break;
          case "2️⃣":
            collectorG3.stop();
            this.helpGameTwo(message, lui);
            break;
  
          default:
            break;
        }
      });
    });
  },
  
   helpTools : function(message, lui) {
    var filter = reac => reac.users.map(u => u.username).includes(lui.username);
    message.clearReactions();
    message.edit(Embed.helpTools).then(message => {
      message.react("◀️");
      var collectorT = message.createReactionCollector(filter);
      collectorT.on("collect", reac => {
        if (reac.emoji.name === "◀️") {
          collectorT.stop();
          this.helpGen(message, lui);
        }
      });
    });
  }
};

module.exports = methods;
