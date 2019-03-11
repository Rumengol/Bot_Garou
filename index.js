//To-do list : empêcher les vivants de voter 2 fois
const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express')
const PORT = process.env.PORT || 5000

const adapter = new FileSync('adminrole.json')
const db = low(adapter);

express().listen(PORT)


var prefix = ("/");
var admin;
var mini = false;
var gameOn = false;
var session = false;
var maxP;
var inscr;
var inscrits = [];
var charmes = [];
var votes = [];
var avote = [];
let identifiers = ["vivants","morts","village","votes","vocal","charmed"]

var bidule;
var chouette;
var x;
var y;
var z;
var pouet;

db.defaults({administrateurs : []}).write();
db.defaults({ministrateurs : []}).write();
db.defaults({salons : []}).write();
db.defaults({roles : []}).write();

bot.on('ready', () => {
    console.log('GRAOU est prêt!');
  });

bot.login('NDYzOTcwNzg4NjI2NjYxMzc3.Dh4KCA._RieY0iR58-lgHhwFZLtQUakPl4');

  bot.on('message', message => {
  //const Vrole = message.guild.roles.find("name","Volontaires");

  if (message.content[0] === prefix){
    
      var lowercase = message.content.toLowerCase();
      let spliteMessage = lowercase.split(" ");
      var adminlist = db.get('administrateurs').map("story_value").value().toString()

      mini = false;
      checkmin(message);
      

      if(spliteMessage[0] === prefix + 'ping'){
        if(mini === true){
        message.reply('pong.');
      }
     else {
      message.reply("ping failed");
    }
  }
  

      //initialisation des rôles admins
      else if(spliteMessage[0] == prefix + 'defadmin' && spliteMessage[1] != null){
        if(adminlist.includes(message.author) || mini === true){
        admin = spliteMessage[1];
        var number = db.get('administrateurs').map("id").value().length;
        db.get('administrateurs')
        .push({id: number, story_value: admin})
        .write();
        message.channel.send("Enregistré, " + admin + " est désormais administrateur.")
        } else {
          message.reply("Nahmaisho ! Seul un administrateurs peut en nommer un autre !")
        }
    }

    //supprime le membre mentionné des administrateurs
    else if(spliteMessage[0] == prefix + 'supadmin' && spliteMessage[1] != null){
      if(adminlist.includes(message.author) || mini === true){  
      noadmin = spliteMessage[1];
        db.get('administrateurs')
        .remove({story_value : noadmin})
        .write();
        message.reply(noadmin + " supprimé des administrateurs.")
      } else {
        message.reply("Nahmaisho ! Seul un administrateurs peut en révoquer un autre !")
      }
    }
    //initialisation des rôles admins sur un serveur unique
    else if(spliteMessage[0] == prefix + 'defadminhere' && spliteMessage[1] != null){
      if(adminlist.includes(message.author) || mini === true){
      admin = spliteMessage[1];
      var number = db.get('ministrateurs').map("id").value().length;
      db.get('ministrateurs')
      .push({guild : message.guild.id, id: number, story_value: admin})
      .write();
      message.channel.send("Enregistré, " + admin + " est désormais administrateur sur ce serveur.")
      } else {
        message.reply("Nahmaisho ! Seul un administrateurs peut en nommer un autre !")
      }
  }

  //supprime le membre mentionné des administrateurs d'un serveur unique
  else if(spliteMessage[0] == prefix + 'supadminhere' && spliteMessage[1] != null){
    if(adminlist.includes(message.author) || mini === true){  
    noadmin = spliteMessage[1];
      db.get('ministrateurs')
      .remove({guild : message.guild.id, story_value : noadmin})
      .write();
      message.reply(noadmin + " supprimé des administrateurs de ce serveur.")
    } else {
      message.reply("Nahmaisho ! Seul un administrateurs peut en révoquer un autre !")
    }
  }

  //fait durer le bot 
  else if(spliteMessage[0] === prefix + 'durable'){
    if(adminlist.includes(message.author) || mini === true){
      message.delete();
      message.channel.send("Bot durable activé.").then(mess =>(setTimeout(function(){mess.delete()},4000)))
      setInterval(function(){message.guild.channels.get('554786165664776232').send("ping")},1680000);
    }
  }

    //initialistion des rôles
    else if(spliteMessage[0] == prefix + 'addrole'){
      if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage[2] != null){
        if(identifiers.toString().includes(spliteMessage[2])){
        db.get('roles')
        .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
        .write();
        message.channel.send("<@&" + spliteMessage[1] + ">" + " ajouté comme rôle des " + spliteMessage[2])
      } else {
        message.reply("identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid")
      }
      } else {
        message.reply("syntaxe incorrecte. La bonne syntaxe est : /Addrole [ID du role] [Identifiant]")
      }
    } else {
      message.reply("commande refusée. Seuls les administrateurs peuvent ajouter des rôles.")
    }
    }

    //suppression du rôle
    else if(spliteMessage[0] == prefix + 'supprole'){
      if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage[2] != null){
        if(identifiers.toString().includes(spliteMessage[2])){
        db.get('roles')
        .remove({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
        .write();
        message.channel.send("<@&" + spliteMessage[1] + "> supprimé des rôles.")
      } else {
        message.reply("identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid")
      }
      } else {
        message.reply("syntaxe incorrecte. La bonne syntaxe est : /Supprole [ID du rôle] [Identifiant]")
      }
    } else {
      message.reply("commande refusée. Seuls les administrateurs peuvent supprimer des rôles.")
    }
    }
        //initialistion des lieux
        else if(spliteMessage[0] == prefix + 'addsalon'){
          if(adminlist.includes(message.author) || mini === true){
          if(spliteMessage[2] != null){
            if(identifiers.includes(spliteMessage[2])){
            db.get('salons')
            .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
            .write();
            message.channel.send("<#" + spliteMessage[1] + ">" + " ajouté comme salon pour les " + spliteMessage[2])
            } else {
              message.reply("identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid")
            }
          } else {
            message.reply("syntaxe incorrecte. La bonne syntaxe est : /addsalon [ID du salon] [Identifiant]")
          }
        } else {
          message.reply("commande refusée. Seuls les administrateurs peuvent ajouter des salons.")
        }
        }
    
        //suppression du lieu
        else if(spliteMessage[0] == prefix + 'suppsalon'){
          if(adminlist.includes(message.author) || mini === true){
          if(spliteMessage[2] != null){
            if(identifiers.toString().includes(spliteMessage[2])){
            db.get('salons')
            .remove({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
            .write();
            message.channel.send("<#" + spliteMessage[1] + "> supprimé des salons.")
          } else {
            message.reply("identifiant inconnu. Vous pouvez trouver la liste des identifiants en tapant /checkid")
          }
          } else {
            message.reply("syntaxe incorrecte. La bonne syntaxe est : /suppsalon [ID du salon] [Identifiant]")
          }
        } else {
          message.reply("commande refusée. Seuls les administrateurs peuvent supprimer des salons .")
        }
        }
    

    //inscription
   else if (spliteMessage[0] === prefix + 'inscription') {
    if(adminlist.includes(message.author) || mini === true){
     maxP = spliteMessage[1];
     message.delete();
    var embed = new Discord.RichEmbed()
      .setTitle("Inscriptions pour les parties de loup Garou")
      .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
      message.channel.send(embed).then(function(message){
      message.react('🐺').catch(console.error);
      inscr = message;
        })
      } else {
        message.reply("commande refusée. Seuls les administrateurs peuvent lancer les parties.")
      }
}
    
    //lancer la partie
   else if(spliteMessage[0] == prefix + 'gamestart'){
    message.delete();
  if(adminlist.includes(message.author) || mini === true){
    if(gameOn === false){
    gameOn = true;
    message.channel.send("Partie lancée, bon appétit !")
  } else {
    message.reply("Erreur, la partie est déjà lancée.")
  }
} else {
  message.reply("commande refusée. Seuls les administrateurs peuvent lancer les parties.")
}
}
    //termine la partie
   else if(spliteMessage[0] == prefix + 'gamend'){
    message.delete();
  if(adminlist.includes(message.author) || mini === true){
    if(gameOn === true){
    gameOn = false;
    reviveAll(message);
    charmes.forEach(charme => {
           var prelieu = []
          getPlaceInDb("charmed",prelieu,message)
          lieu = chouette;
      var lui = message.guild.members.get(charme.id);
      message.guild.channels.get(lieu).overwritePermissions(lui,{'VIEW_CHANNEL':false, 'SEND_MESSAGES':false});
    });
    charmes = [];
    message.channel.send("Partie terminée, merci d'avoir joué !")
  } else {
    message.reply("Erreur, aucune partie n'est en cours.")
  }
} else {
  message.reply("commande refusée. Seuls les administrateurs peuvent terminer les parties.")
}
}
  //termine la session
  else if(spliteMessage[0] == prefix + 'allend'){
    message.delete();
  if(adminlist.includes(message.author) || mini === true){
    if(session === false){
    gameOn = false;
    var prerole = [];
    getRoleInDb("vivants",prerole,message)
    role = bidule;
    
    var prelieu = []
    getPlaceInDb("village",prelieu,message)
    lieu = chouette;  
 
  eux = message.guild.roles.get(role).members;
  eux.forEach(lui => {
  lui.removeRole(role);
  });
    message.channel.send("Session terminée, merci d'avoir joué ! A la prochaine fois !")
  } else {
    message.reply("Erreur, aucune session n'est en cours.")
  }
} else {
  message.reply("commande refusée. Seuls les administrateurs peuvent terminer les sessions.")
}
}

  //clear le channel - admin
    else if(spliteMessage[0] === prefix + 'clear'){
      if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage.length === 2){
        if(spliteMessage[1].match(/^\d+$/)){
      var nombre = parseInt(spliteMessage[1]);
      message.channel.bulkDelete(nombre + 1);
      }
        else{
        message.channel.send("Erreur, il me faut un nombre de message à nettoyer! ")
        }
      }
      else{
        message.channel.send("Erreur, je ne peux pas nettoyer ça.")}
    }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  //check qui sont les admins
  else if(spliteMessage[0] == prefix + 'checkadmin'){
    message.reply("Les administrateurs sont " + db.get('administrateurs').map("story_value").value());
}
  //Retourne les identifiants reconnus
  else if(spliteMessage[0] == prefix + 'checkid'){
    message.reply("Les identifiants reconnus sont \n - vivants : le rôle des joueurs vivants \n - morts : le rôle des joueurs morts \n - village : le salon de discussion de jour \n - votes : le salon des votes");
}

  // Tue le joueur mentionné.
    else if (spliteMessage[0] === prefix + 'kill'){

      if(adminlist.includes(message.author) || mini === true){
    if (spliteMessage.length === 2){
      let lui = message.guild.member(message.mentions.users.first());
        if(lui === null){
          message.reply("Formulation incorrecte. La bonne syntaxe est : /kill @[utilisateur].")
        }
        else{
          var prerole= [];
          getRoleInDb("vivants",prerole,message)
          role= bidule;
         lui.removeRole(role);
         var prerole2= [];
          getRoleInDb("morts",prerole2,message)
          role2= bidule;
         lui.addRole(role2);
         var prelieu = []
          getPlaceInDb("village",prelieu,message)
          lieu = chouette;
         message.guild.channels.get(lieu).send(lui + " est mort");
        var prelieu2 = []
        getPlaceInDb("charmed",prelieu2,message)
        lieu2 = chouette;

        message.guild.channels.get(lieu2).overwritePermissions(lui,{'VIEW_CHANNEL':false, 'SEND_MESSAGES':false});
        charmes.splice(charmes.indexOf(lui),1);
        }
    }
     else{
      message.reply("Formulation incorrecte. La bonne syntaxe est : /kill @[utilisateur].");
     }
    }
  
    else {
      message.delete();
      message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
    }
}
else if (spliteMessage[0] === prefix + 'revive'){

  if(adminlist.includes(message.author) || mini === true){
if (spliteMessage.length === 2){
  let lui = message.guild.member(message.mentions.users.first());
    if(lui === null){
      message.reply("Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur] ou /reviveall.")
    }
    else{
      var prerole= [];
      getRoleInDb("vivants",prerole,message)
      role= bidule;
     lui.removeRole(role);
     var prerole2= [];
      getRoleInDb("morts",prerole2,message)
      role2= bidule;
     lui.addRole(role2);
     var prelieu = []
          getPlaceInDb("village",prelieu,message)
          lieu = chouette;
     message.guild.channels.get(lieu).send(lui + " a ressuscité !");
    }
}
 else{
  message.reply("Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur].");
 }
}

else {
  message.delete();
  message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
}
}

    //Revive de masse
    else if(spliteMessage[0] == prefix + 'reviveall'){
      message.delete();
      if(adminlist.includes(message.author) || mini === true){
        reviveAll(message);
    } else {
      message.reply("commande refusée. Seuls les administrateurs peuvent lancer les parties.")
    }
    }
    //Mise en place des votes
    else if(spliteMessage[0] === prefix + 'vote'){
      votes = [];
      avote = [];
      if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage.length === 2){
        if(spliteMessage[1] === "jour"){
          message.delete();
          voteJour(message);
        }else {
        message.delete();
        let votelist = spliteMessage[1].split(",");
        for (var i = 0; i < votelist.length; i++){
        message.channel.send(votelist[i]).then(function(message){
        message.react('👎');
        votes.push(message);
        });
        }
      }
      }
      else {
        message.delete();
        message.channel.send("Formulation incorrecte. La bonne syntaxe est : ``/vote [vote1],[vote2],[...],[voteN]``");
      }
    }
  
    else {
      message.delete();
      message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
    }
    }
//    else if (spliteMessage[0] === prefix + "reset"){
//    if(spliteMessage.length === 1){
//    let role = message.guild.roles.find("name","Joueurs morts");
//    let role2 = message.guild.roles.find("name","Joueurs vivants");
//    let eux = message.guild.roles.find('name','Joueurs morts').members.map(m => m.user);
//    message.channel.sendMessage("Les joueurs morts étaient " + eux);
//    eux.removeRole(role);
//    eux.addRole(role2);
//    message.channel.sendMessage("True reset effectué.");
//    }
//}


  //Commence la journée 
    else if(spliteMessage[0] === prefix + 'daystart'){
      
      if(adminlist.includes(message.author) || mini === true){
        if(spliteMessage[1] != null && spliteMessage[1].match(/^\d+$/)){
          pouet = parseInt(spliteMessage[1]);
        }else{
          pouet = 5;
        }
      var finpouet = pouet*60000;
       
      message.delete();
      var prerole= [];
          getRoleInDb("vivants",prerole,message)
          role= bidule;
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':true});
    message.channel.send("Une nouvelle journée commence."); 
    var prelieu = []
          getPlaceInDb("votes",prelieu,message)
          lieu = chouette;
          var prelieu2 = []
          getPlaceInDb("vocal",prelieu2,message)
          lieu2 = chouette;
    if(lieu == null || lieu2 == null){ message.reply("Salon de vote ou vocal non défini")} else{
    message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':true});
    message.guild.channels.get(lieu2).overwritePermissions(role,{'SPEAK':true});
    message.guild.channels.get(lieu2).overwritePermissions(role,{'USE_VAD':true});
    x = setInterval(function(){
      message.channel.send(pouet + " minutes restantes.");
      pouet -= 1;
    },60000);
    y = setTimeout(function(){
      message.channel.send("30 secondes restantes.");
      clearInterval(x);
    },finpouet - 30000);
    z = setTimeout(function(){
      message.channel.overwritePermissions(role,{'SEND_MESSAGES':false});
      message.channel.send("La journée s'achève. Bonne nuit.");
      message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':false});
      message.guild.channels.get(lieu2).overwritePermissions(role,{'SPEAK':false});
      message.guild.channels.get(lieu2).overwritePermissions(role,{'USE_VAD':false});
    }, finpouet);
  }
}
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  //prolongations
  else if(spliteMessage[0] === prefix + 'prolong'){;
    if(adminlist.includes(message.author) || mini === true){

      if(spliteMessage[1] != null && spliteMessage[1].match(/^\d+$/)){
        pouet = parseInt(spliteMessage[1]);
      }else{
        pouet = 90;
      }
    var finpouet = pouet*6000;

    message.delete();
    var prerole= [];
          getRoleInDb("vivants",prerole,message)
          role= bidule;
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':true});
    message.channel.send("Une égalité dans les votes mène toujours à des débats supplémentaires."); 
    var prelieu = []
          getPlaceInDb("votes",prelieu,message)
          lieu = chouette;
          var prelieu2 = []
          getPlaceInDb("vocal",prelieu2,message)
          lieu2 = chouette;
  message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':true});
  message.guild.channels.get(lieu2).overwritePermissions(role,{'SPEAK':true});
    message.guild.channels.get(lieu2).overwritePermissions(role,{'USE_VAD':true});
    x = setInterval(function(){
      message.channel.send(pouet + " secondes restantes.");
      pouet -= 30;
    },30000);
    z = setTimeout(function(){
      message.channel.overwritePermissions(role,{'SEND_MESSAGES':false});
      message.channel.send("La journée s'achève. Bonne nuit.");
      message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':false});
      message.guild.channels.get(lieu2).overwritePermissions(role,{'SPEAK':false});
      message.guild.channels.get(lieu2).overwritePermissions(role,{'USE_VAD':false});
      clearInterval(x);
    }, finpouet);
  }
else {
  message.delete();
  message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
}
  }

  //Achève la journée
    else if(spliteMessage[0] === prefix + 'dayend'){

      if(adminlist.includes(message.author) || mini === true){
      message.delete();
      var prerole= [];
      getRoleInDb("vivants",prerole,message)
      role= bidule;
      var prelieu = []
      getPlaceInDb("votes",prelieu,message)
      lieu = chouette;
      var prelieu2 = []
      getPlaceInDb("vocal",prelieu2,message)
      lieu2 = chouette;

    clearInterval(x)
    clearTimeout(y)
    clearTimeout(z)
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':false});
    message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':false});
    message.guild.channels.get(lieu2).overwritePermissions(role,{'SPEAK':false});
    message.guild.channels.get(lieu2).overwritePermissions(role,{'USE_VAD':false});
    message.channel.send("La journée s'achève. Bonne nuit.");
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  else if(spliteMessage[0] === prefix + 'charme'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
        var prelieu = db.get(`salons`).map("id").value().indexOf("charmed")
        var lieu = db.get(`salons[${prelieu}].story_value`).value()
        message.guild.channels.get(lieu).overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':false});
        message.guild.channels.get(lieu).send(lui + " vient de se faire charmer !");
        charmes.push(lui);
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/charme @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  else if(spliteMessage[0] === prefix + 'decharme'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
        var prelieu = db.get(`salons`).map("id").value().indexOf("charmed")
        var lieu = db.get(`salons[${prelieu}].story_value`).value()
        message.guild.channels.get(lieu).overwritePermissions(lui,{'VIEW_CHANNEL':false, 'SEND_MESSAGES':false});
        charmes.splice(charmes.indexOf(lui),1);
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/decharme @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  //arrête toutes les actions en cours
  else if(spliteMessage[0] === prefix + 'stop'){
    if(adminlist.includes(message.author) || mini === true){
      message.delete();
      clearInterval(x);
      clearInterval(y);
      clearInterval(z);
      let tempo = message.channel.send("Tous les décomptes ont été interrompus.")
      setTimeout(tempo.delete(),5000);
    }
  }

  //Casse le bot
   else if(spliteMessage[0] === prefix + 'break'){
    if(adminlist.includes(message.author) || mini === true){
    message.delete();
  //  message.guild.members.removeRole('27');
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
}
  //aide
  else if(spliteMessage[0] === prefix + 'help'){
    var embed = new Discord.RichEmbed()
                    .setTitle("Aide pour les différentes commandes en jeu :")
                    .setDescription("La plupart de ces commandes ne sont accessibles qu'aux maîtres du jeu.")
                    .addField("► ``/clear X`` ","Supprime les X messages au dessus de la commande effectuée.")
                    .addField("► ``/kill @membre`` ","Tue le membre mentionné, lui donnant le rôle de joueur mort.")
                    .addField("► ``/revive @membre``","Ressuscite le joueur mentionné, lui donnant le rôle de joueur vivant.")
                    .addField("► ``/reviveall`` ","Ressuscite tous les joueurs morts.")
                    .addField("► ``/daystart X`` ","Commence la journée, qui dure X minutes, ou 5 si non précisé.")
                    .addField("► ``/vote vote1,vote2,vote3,...`` ","Crée un vote avec les paramètres annoncés, ou")
                    .addField("► ``/vote jour`` ","Crée un vote avec comme paramètres les joueurs vivants.")
                    .addField("► ``/prolong X`` ","Prolonge la journée de X secondes, ou 1 minute 30 si non précisé.")
                    .addField("► ``/dayend`` ","Termine de façon anticipée la journée. A éviter si possible.")
                    .addField("► ``/inscription X`` ","Envoie le message d'inscription, jusqu'à un maximum de X inscriptions.")
                    .addField("► ``/gamestart`` ","Démarre la partie, empêchant les inscriptions intempestives.")
                    .addField("► ``/gamend`` ","Termine la partie, ressuscitant tous les joueurs.")
                    .addField("► ``/allend`` ","Termine la session, réinitialisant les rôles.")
                    .addField("► ``/charme @membre`` ","Charme le joueur mentionné, le faisant rejoindre le salon #le-cercle-des-charmes.")
                    .addField("► ``/stop`` ","Interrompt tous les décomptes en cours.")
                    .setColor("OxFF0000")
                  
                message.channel.send(embed)
  }

  else if(spliteMessage[0] = prefix + "opentest"){
    message.delete();
    if(adminlist.includes(message.author)){
      var role = message.channel.guild.roles.get('name', 'here');
      console.log(role)
      if(role != null){
        role.members.forEach(user => {
          var number = db.get('ministrateurs').map("id").value().length;
          db.get('ministrateurs')
          .push({guild : message.guild.id, id: number, story_value: user})
          .write();
          message.channel.send("Les bêta-testeurs ont désormais la possibilité d'utiliser les commandes du bot")
        });
      } else {
        message.reply("Bêta-test indisponible sur ce serveur.");
      }
    }
  }

  else if(spliteMessage[0] = prefix + "closetest"){
    message.delete();
    if(adminlist.includes(message.author)){
      var role = message.guild.roles.get('name','Bêta-testeurs');
      if(role != null){
        role.users.forEach(user => {
           db.get('ministrateurs')
           .remove({guild : message.guild.id, story_value : user})
           .write();
          message.channel.send("Les bêta-testeurs ont désormais la possibilité d'utiliser les commandes du bot")
        });
      } else {
        message.reply("Bêta-test indisponible sur ce serveur. Pourquoi voulez-vous utiliser cette commande ?");
      }
    }
  }

//Attribution des rôles
  //Loup-garou
  else if(spliteMessage[0] === prefix + 'lg'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','taniere');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Graou mon ami, " + lui + ", tu es **Loup-garou** !");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/lg @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Cupidon
  else if(spliteMessage[0] === prefix + 'cupi'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','nuage');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + " tu es **Cupidon**, diffuseur d'amour et de suicide collectifs !");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/cupi @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Voyante
  else if(spliteMessage[0] === prefix + 'vovo'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','roulotte');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + "tu es **Voyante**, mais tu le savais déjà, n'est-ce pas ?");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/vovo @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Salvateur
  else if(spliteMessage[0] === prefix + 'salva'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','croix');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + " tu es **Salvateur**, protecteur de la veuve et de l'orphelin ! Et bientôt les deux !");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/salva @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Sorcière
  else if(spliteMessage[0] === prefix + 'soso'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','antre');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + "tu es **Sorcière**. Au bûcher.");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/soso @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Corbeau
  else if(spliteMessage[0] === prefix + 'corbac'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','nid');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Crôa, " + lui + " tu es **Corbeau**, signe de malheur et de pendaison !");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/corbac @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Joueur de flûte
  else if(spliteMessage[0] === prefix + 'jdf'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','theatre');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + " tu es **Joueur de flûte**, envoûteur du village et musicien au talent incontesté !");
      message.channel.send(lui + ' Validé');
      }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/jdf @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Soeurs
  else if(spliteMessage[0] === prefix + 'soeur'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      SalLg = message.guild.channels.find('name','cachette');
      SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
      SalLg.send("Félicitations, " + lui + " tu es l'un des **jumeaux**, va vite parler avec l'autre avant qu'il ne... ah bah, trop tard  !");
      message.channel.send(lui + ' Validé');  
    }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/soeur @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Chasseur
  else if(spliteMessage[0] === prefix + 'chassou'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      lui.createDM().then(channel => {
      channel.send("Félicitations, " + lui + " tu es **Chasseur** ! Ce bon vieux jeu du chasseur chassé...");
      })
     }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/chassou @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Idiot du village
  else if(spliteMessage[0] === prefix + 'idv'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      lui.createDM().then(channel => {
      channel.send("Félicitations, " + lui + " tu es **Idiot du village** ! C'est moins pire qu'il n'y parait, je t'assure.");
      })
    }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/idv @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Ancien
  else if(spliteMessage[0] === prefix + 'ancien'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      lui.createDM().then(channel => {
      channel.send("Félicitations, " + lui + " tu es l'**Ancien** ! Gare à la sénilité !");
      })
    }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/ancien @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Bouc émissaire
  else if(spliteMessage[0] === prefix + 'be'){
    if(adminlist.includes(message.author) || mini === true){
    if(spliteMessage.length <= 2){
      message.delete();
      let lui = message.guild.member(message.mentions.users.first());
      if(lui === null){
        message.reply("Veuillez mentionner un utilisateur valide.");
      }
      else{
      lui.createDM().then(channel => {
      channel.send("Félicitations, " + lui + " tu es **Bouc émissaire** ! T'as jamais été très aimé...");
      })
    }
    }
    else {
      message.delete();
      message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/be @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
  //Loup-garou blanc
  else if(spliteMessage[0] === prefix + 'lgb'){
    if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage.length <= 2){
        message.delete();
        let lui = message.guild.member(message.mentions.users.first());
        if(lui === null){
          message.reply("Veuillez mentionner un utilisateur valide.");
        }
        else{
        SalLg = message.guild.channels.find('name','taniere_recoin');
        SalLg.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':true});
        SalLg.send("Félicitations, " + lui + " tu es le **Loup-garou blanc** ! Ce bon vieux jeu du chasseur doublement chassé...");
        message.channel.send(lui + ' Validé');
       }
    }
      else {
        message.delete();
        message.channel.send("Formulation incorrecte. La bonne syntaxe est ``/lgb @[utilisateur]``");
    }
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }
else{
  message.reply("Commande inconnue. Veuillez utiliser ``/help`` pour avoir une liste des commandes.")
}
}});

bot.on('messageReactionAdd', (reac,lui) => {
  if(reac.message === inscr){
    var prerole = [];
    getRoleInDb("vivants",prerole,reac.message)
    console.log(getRoleInDb("vivants",prerole,reac.message))
    role = bidule;
    if(gameOn === false){
      //Si on a atteint le maximum d'inscriptions
      if(reac.count > maxP+1){
          reac.remove(lui);
          lui.createDM().then(channel =>{
            channel.send("Inscription refusée, la partie est déjà complète. Essaie la prochaine !");
          });
    } else {
      if(reac.count > 1){
        inscrits.push(lui);
        reac.message.guild.members.get(lui.id).addRole(role);
        reac.message.edit(new Discord.RichEmbed()
        .setTitle("Inscriptions pour les parties de loup Garou")
        .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
        .addField("Joueurs inscrits :", inscrits));
        } 
      }
      }else {
        lui.createDM().then(channel =>{
        reac.remove(lui);
        channel.send("Une partie est déjà en cours, il est impossible de s'inscrire !");
        });
    }
  }

 /* else if(votes.includes(reac.message)){
    if(avote.includes(lui) === false){
      if(lui.bot === false){
      avote.push(lui);
      }
    } else {
      reac.remove(lui);
      console.log(lui + " déréacté.");
    }
  }*/
})

bot.on('messageReactionRemove', (reac,lui) => {
  if(reac.message === inscr){
          var prerole= [];
          getRoleInDb("vivants",prerole,reac.message)
          role= bidule;

        inscrits.splice(inscrits.indexOf(lui),1);
        console.log(inscrits);
        reac.message.guild.members.get(lui.id).removeRole(role);
        reac.message.edit(new Discord.RichEmbed()
        .setTitle("Inscriptions pour les parties de loup Garou")
        .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
        .addField("Joueurs inscrits :", "." + inscrits));
  }
  
  else if(votes.includes(reac.message)){
    if(avote.includes(lui) === true){
      avote.splice(avote.indexOf(lui),1);
    } 
  }
})

function reviveAll(message){
  var prerole= [];
  getRoleInDb("vivants",prerole,message)
  role= bidule;
 lui.removeRole(role);
 var prerole2= [];
  getRoleInDb("morts",prerole2,message)
  role2= bidule;
 lui.addRole(role2);
 
  eux = message.guild.roles.get(role2).members;
  eux.forEach(lui => {
  lui.removeRole(role2);
  lui.addRole(role);
  });
  console.log("Réussite du reviveall");
}

function voteJour(message){
          votes = [];
          avote = [];
          var previvant = [];
          var prelieu = []
        
          getRoleInDb("vivants",previvant,message)
          Jvivants = bidule;
          
          getPlaceInDb("votes",prelieu,message)
          lieu = chouette;
          
          vivants = Array.from(message.guild.roles.get(Jvivants).members.values())
          for(var i = 0; i < vivants.length; i++){
            message.guild.channels.get(lieu).send(" " +  vivants[i]).then(function(message){
            message.react('👎');
            votes.push(message);
            });
          }
}

function getRoleInDb(machin,junk,message){
  while(true){
    var truc = db.get(`roles`).map("id").value().indexOf(machin,truc);
    if(truc === -1){
      break;
    } else {
    junk.push(truc);
    truc += 1;
    }
    }
      junk.forEach(minijunk => {
        if(db.get(`roles[${minijunk}].guild`).value() === message.guild.id){
          bidule = db.get(`roles[${minijunk}].story_value`).value()
          return(db.get(`roles[${minijunk}].story_value`).value())
        } else {return false}
      });
}

function getPlaceInDb(machin,junk,message){
  while(true){
    var truc = db.get(`salons`).map("id").value().indexOf(machin,truc);
    if(truc === -1){
      break;
    } else {
    junk.push(truc);
    truc += 1;
    }
    }
      junk.forEach(minijunk => {
        if(db.get(`salons[${minijunk}].guild`).value() === message.guild.id){
          chouette = db.get(`salons[${minijunk}].story_value`).value();
        } else {return false}
      });
}

function checkmin(message){
  var lui = db.get('ministrateurs').map("story_value").value().toString()
  if(lui.includes(message.author)){
   var lui2 = db.get('ministrateurs').map("story_value").value().indexOf(message.author.toString());
   if(db.get(`ministrateurs[${lui2}].guild`).value() === message.guild.id){
     mini = true;; 
   }
  }
}