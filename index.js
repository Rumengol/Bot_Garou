//to do : retirer des inscrits ceux qui se désinscrivent : check
//Remanier le rôle Sorcière, qu'il propose potion de vie puis de mort : check !
//Le collecteur de la nuit derp : on est au courant
//Les joueurs ne sont pas muets la nuit ni les morts : POULOULOU CHECK MAGGLE
//Cupidon wtf : check et JDF aussi
//Feedback discord pour les rôles de nuit : check
//phrase du JDF pas convaincante : check

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
var messCompo;
var compoDone = false;
var inscrEmbed;
var DMLG;

var maxP;
var inscr;
var nbRole = 0;
var inscrits = [];
var inscrep = [];
var distribRoles = [];
var charmes = [];
var votes = [];
var avote = [];
var joueursLG = []

var distribution = [];
var valides = [];

let identifiers = ["vivants","morts","village","votes","vocal","charmed","general","loups","logs"]

let listeRoles = ["Loup-Garou","Simple Villageois","Cupidon","Sorcière","Voyante","Chasseur","Idiot Du Village","Ancien","Salvateur"]

let IDlg = ["Loup-Garou","loup-garou","loups-garou","loup garou","loups garou","loups-garous","loups garous","lg","warwick "]
let LG = "Loup-Garou"
let emoteLG = ":wolf:"
let IDcupi = ["Cupidon","cupidon","cupi","varus"]
let Cupi = "Cupidon"
let emoteCupi = ":bow_and_arrow:"
let IDsoso = ["Sorcière","sorcière","sorciere","soso","witch","sorcier","morgana"]
let Soso = "Sorcière"
let emoteSoso = ":alembic:️"
let IDvovo = ["Voyante","voyante","vovo","voyant","vel'koz"]
let Vovo = "Voyante"
let emoteVovo = ":eye:"
let IDchassou = ["Chasseur","chasseur","chasseuse","chassou","chasou","hunter","vayne"]
let Chassou = "Chasseur"
let emoteChassou = ":gun:"
let IDidv = ["IDV","idiot du village","idiot","idv","idiotduvillage","mundo"]
let IDV = "Idiot du village"
let emoteIDV = ":drooling_face:"
let IDancien = ["Ancien","ancien","vieux","maokai"]
let Ancien = "Ancien"
let emoteAncien = ":older_man:"
let IDjdf = ["Joueur de flûte","JDF","joueur de flûte","jdf","flûtise","musicien","joueur de flute","arhi"]
let JDF = "Joueur de flûte"
let emoteJDF = ":musical_note:"
let IDsalva = ["Salvateur","salvateur","salva","salveur","salvateurs","taric"]
let Salva = "Salvateur"
let emoteSalva = ":shield:"
let IDsv = ["Paysan","paysan","paysans","simple villageois","simples villageois","sv","villageois","teemo"]
let SV = "Paysan"
let emoteSV = ":man:‍:ear_of_rice:"

var rolesDeNuit = [Cupi,Salva,LG,Soso,Vovo,JDF,]
var potVie = true;
var potMort = true;
var protect = "";

var compo = [];

var roleDB;
var lieuDB;
var x;
var y;
var z;
var pouet;

token = 'NDYzOTcwNzg4NjI2NjYxMzc3.Dh4KCA._RieY0iR58-lgHhwFZLtQUakPl4';

var adminlist = db.get('administrateurs').map("story_value").value().toString()

db.defaults({administrateurs : []}).write();
db.defaults({ministrateurs : []}).write();
db.defaults({salons : []}).write();
db.defaults({roles : []}).write();

bot.on('ready', () => {
    console.log('GRAOU est prêt!');
    Activity();
  });

bot.login(token);

  bot.on('message', message => {

  if (message.content[0] === prefix){
    
      const filter = m=>m.author === message.author || adminlist.includes(m.author);
      const filter2 = m=>inscrits.includes(m.author.id)
      var lowercase = message.content.toLowerCase();
      let spliteMessage = lowercase.split(" ");
      

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
        .push({id: number, story_value: admin, user: admin.id})
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
  else if(spliteMessage[0] === prefix + 'eco'){
    if(adminlist.includes(message.author) || mini === true){
      message.delete();
      message.channel.send("Le bot s'endormira après 30 minutes d'inactivité.").then(message =>(setTimeout(function(){message.delete()},4000)))
      clearInterval(actif)
    }
  }

    //initialistion des rôles
    else if(spliteMessage[0] == prefix + 'addrole'){
      if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage[2] != null){
        if(identifiers.toString().includes(spliteMessage[2])){
                 getRoleInDb(spliteMessage[2],message)
              role = roleDB;
              //Si c'est le cas
              if(role != null){
                //Demande si le salon doit être remplacé
              question = message.channel.send("Un rôle est déjà attribué à cet identifiant. Voulez-vous le remplacer ? \n ``Oui/Non``")
               //Crée un collecteur laissant une marge de 10 secondes pour répondre, qui ne réagit qu'à l'auteur du message
               
               collector = message.channel.createCollector(filter, {time:10000})
                collector.on('collect', message => {
                  //S'il répond oui, alors le salon est remplacé
                if(message.content.toLowerCase() === "oui"){
                  db.get('roles')
                  .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
                  .write();
                  db.get('roles')
                  .remove({guild : message.guild.id, id : spliteMessage[2], story_value : role})
                  .write();
                  message.channel.send("<@&" + spliteMessage[1] + ">" + " ajouté comme rôle des " + spliteMessage[2])
                  collector.stop();  
                }
                else if(message.content.toLowerCase() === "non"){
                  //S'il répond non, la commande est annulée
                  message.channel.send("Commande annulée.").then(function(temp){  
                    temp.delete(5000)
                    })
                  collector.stop();
                } else {
                  //S'il répond autre chose, une erreur est affichée
                  temp = message.reply("Erreur, veuillez répondre par oui ou par non.")
                }
                
               })}
               else {
                db.get('roles')
                .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
                .write();
                message.channel.send("<@&" + spliteMessage[1] + ">" + " ajouté comme rôle des " + spliteMessage[2])
               }
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
          //Vérification que l'auteur est administrateur, au moins local
          if(adminlist.includes(message.author) || mini === true){
            //Vérification que l'identifiant est fourni
          if(spliteMessage[2] != null){
            //Vérification que l'identifiant fourni est reconnu
            if(identifiers.includes(spliteMessage[2])){
              //Récupère le lieu dans la base de données s'il est présent
              getPlaceInDb(spliteMessage[2],message)
              lieu = lieuDB;
              //Si c'est le cas
              if(lieu != null){
                //Demande si le salon doit être remplacé
              question = message.channel.send("Un salon est déjà attribué à cet identifiant. Voulez-vous le remplacer ? \n ``Oui/Non``")
               //Crée un collecteur laissant une marge de 10 secondes pour répondre, qui ne réagit qu'à l'auteur du message
               
               collector = message.channel.createCollector(filter, {time:10000})
                collector.on('collect', message => {
                  //S'il répond oui, alors le salon est remplacé
                if(message.content.toLowerCase() === "oui" || message.content.toLowerCase() === "o"){
                  db.get('salons')
                  .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
                  .write();
                  db.get('salons')
                  .remove({guild : message.guild.id, id : spliteMessage[2], story_value : lieu})
                  .write();
                  message.channel.send("<#" + spliteMessage[1] + ">" + " remplacé comme salons " + spliteMessage[2])
                  collector.stop();  
                }
                else if(message.content.toLowerCase() === "non" || message.content.toLowerCase() === "n"){
                  //S'il répond non, la commande est annulée
                  message.channel.send("Commande annulée.").then(function(temp){  
                    temp.delete(5000)
                    })
                  collector.stop();
                } else {
                  //S'il répond autre chose, une erreur est affichée
                  message.reply("Erreur, veuillez répondre par oui ou par non.").then(function(temp){  
                    temp.delete(5000)
                    })
                }
                
               })}
               else {
                db.get('salons')
                .push({guild : message.guild.id, id : spliteMessage[2], story_value : spliteMessage[1]})
                .write();
                message.channel.send("<#" + spliteMessage[1] + ">" + " ajouté comme salons " + spliteMessage[2])
               }
            }
               else {
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
      inscrEmbed = new Discord.RichEmbed()
      .setTitle("Inscriptions pour les parties de loup Garou")
      .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
      message.channel.send(inscrEmbed).then(function(message){
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

    getPlaceInDb("loups",message)
    lieu = message.guild.channels.get(lieuDB)

    distribRoles.forEach(joueur => {
      if(joueur[1] === LG){
        lieu.overwritePermissions(joueur[0],{'VIEW_CHANNEL':false, 'SEND_MESSAGES':false})
      }
    });

    getRoleInDb("vivants",message)
    role = roleDB

    reviveAll(message);
    unmute(role,message)

    charmes.forEach(charme => {
          getPlaceInDb("charmed",message)
          lieu = lieuDB;
      var lui = message.guild.members.get(charme.id);
      message.guild.channels.get(lieu).overwritePermissions(lui,{'VIEW_CHANNEL':false, 'SEND_MESSAGES':false});
    });
    charmes = [];
    if(messCompo != null){
    messCompo.unpin();
    }

    gameOn = false;
    compoDone = false;
     nbRole = 0;
     inscrits = [];
     inscrep = [];
     distribRoles = [];
     charmes = [];
     votes = [];
     avote = [];
     joueursLG = []
     distribution = [];
     valides = [];
     protect = "";
     potVie = true;
     potMort = true;
    message.channel.send("Partie terminée, merci d'avoir joué !")
} else {
  message.reply("commande refusée. Seuls les administrateurs peuvent terminer les parties.")
}
}

  //termine la session
  else if(spliteMessage[0] == prefix + 'allend'){
    message.delete();
  if(adminlist.includes(message.author) || mini === true){

    reviveAll(message)

    gameOn = false;
    getRoleInDb("vivants",message)
    role = roleDB;
    
    getPlaceInDb("vocal",message)
    lieu = lieuDB;  

    getPlaceInDb("general",message)
    lieu2 = lieuDB
 
  eux = message.guild.roles.get(role).members;
  if(lieu2 === lieu){
    message.channel.send("Session terminée, merci d'avoir joué ! A la prochaine fois !")
  } else {
    message.channel.send("Session terminée, merci d'avoir joué ! Les participants seront déplacés dans le salon vocal général d'ici 3 secondes...")
    blep = setTimeout(function(){
      eux.forEach(lui => {
        lui.setVoiceChannel(lieu2);
        });
    },3000)
  }
  eux.forEach(lui =>{
    lui.removeRole(role);
  })
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
  
  //Mute (vocal) la personne mentionnée
  else if(spliteMessage[0] === prefix + 'mute'){
    if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage.length === 2){
        message.guild.member(message.mentions.users.first()).setMute(true)
        message.channel.send(message.guild.member(message.mentions.users.first()) + " est mute !")
      } else {
        message.reply("Qui dois-je mute ?")
      }
      message.delete()
    } else {
      message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
    }
  }

  //Unmute (vocal) la personne mentionnée
  else if(spliteMessage[0] === prefix + 'unmute'){
    if(adminlist.includes(message.author) || mini === true){
      if(spliteMessage.length === 2){
        message.guild.member(message.mentions.users.first()).setMute(false)
        message.channel.send(message.guild.member(message.mentions.users.first()) + " n'est plus mute !")
      } else {
        message.reply("Qui dois-je unmute ?")
      }
      message.delete()
    } else {
      message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
    }
  }

  //check qui sont les admins
  else if(spliteMessage[0] == prefix + 'checkadmin'){
    message.reply("Les administrateurs sont " + db.get('administrateurs').map("story_value").value());
}
  //Retourne les identifiants reconnus
  else if(spliteMessage[0] == prefix + 'checkid'){
    if(spliteMessage[1] === "admin"){
      message.channel.send("Liste de tous les IDs : \n" + identifiers.toString());
      message.delete();
    } else{
    message.reply("Les identifiants reconnus sont \n - vivants : le rôle des joueurs vivants \n - morts : le rôle des joueurs morts \n - village : le salon de discussion de jour \n - votes : le salon des votes");
  }
  }

  // Tue le joueur mentionné.
    else if (spliteMessage[0] === prefix + 'kill'){

      if(adminlist.includes(message.author) || mini === true){
    if (spliteMessage.length === 2){
      var rolmort = ""
      let lui = message.guild.member(message.mentions.users.first());
        if(lui === null){
          message.reply("Formulation incorrecte. La bonne syntaxe est : /kill @[utilisateur].")
        }
        else{

          getRoleInDb("vivants",message)
          role= roleDB;
         lui.removeRole(role);
              getRoleInDb("morts",message)
          role2= roleDB;
         lui.addRole(role2);
               getPlaceInDb("village",message)
          lieu = lieuDB;

          getPlaceInDb("vocal",message)
          lieu3 = lieuDB

          var item = distribRoles[findItemInList(distribRoles,lui)]
          if(item != undefined){
            rolmort = ", il/elle était " + item[1];
            distribRoles.splice(distribRoles.indexOf(item),1)
          }

        lui.setMute(true)
         message.guild.channels.get(lieu).send(lui + " est mort" + rolmort);


            getPlaceInDb("charmed",message)
        lieu2 = lieuDB;

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
        getRoleInDb("morts",message)
      role= roleDB;
     lui.removeRole(role);
      getRoleInDb("vivants",message)
      role2= roleDB;
     lui.addRole(role2);
           getPlaceInDb("village",message)
          lieu = lieuDB;
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
            getRoleInDb("vivants",message)
          role= roleDB;
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':true});
    message.channel.send("Une nouvelle journée commence."); 
          getPlaceInDb("votes",message)
          lieu = lieuDB;
                getPlaceInDb("vocal",message)
          lieu2 = lieuDB;
    if(lieu == null || lieu2 == null){ message.reply("Salon de vote ou vocal non défini")} else{
    message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':true});
    unmute(role,message)
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
      mute(role,message)
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
          getRoleInDb("vivants",message)
          role= roleDB;
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':true});
    message.channel.send("Une égalité dans les votes mène toujours à des débats supplémentaires."); 
          getPlaceInDb("votes",message)
          lieu = lieuDB;
                getPlaceInDb("vocal",message)
          lieu2 = lieuDB;
  message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':true});
  unmute(role,message)
    x = setInterval(function(){
      message.channel.send(pouet + " secondes restantes.");
      pouet -= 30;
    },30000);
    z = setTimeout(function(){
      message.channel.overwritePermissions(role,{'SEND_MESSAGES':false});
      message.channel.send("La journée s'achève. Bonne nuit.");
      message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':false});
      mute(role,message)
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
        getRoleInDb("vivants",message)
      role= roleDB;
        getPlaceInDb("votes",message)
      lieu = lieuDB;
        getPlaceInDb("vocal",message)
      lieu2 = lieuDB;

    clearInterval(x)
    clearTimeout(y)
    clearTimeout(z)
    message.channel.overwritePermissions(role,{'SEND_MESSAGES':false});
    message.guild.channels.get(lieu).overwritePermissions(role,{'VIEW_CHANNEL':false});
    mute(role,message)
    message.channel.send("La journée s'achève. Bonne nuit.");
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
  }

  //Annonce une commande de nuit
  else if(spliteMessage[0] === prefix + 'nuit'){
    if(adminlist.includes(message.author) || mini === true){
          getPlaceInDb("loups",message)
       lieu = message.guild.channels.get(lieuDB);

          getPlaceInDb("charmed",message)
       lieu2 = message.guild.channels.get(lieuDB)

       getPlaceInDb("logs",message)
       logs = message.guild.channels.get(lieuDB)

       getRoleInDb("vivants",message)
       var Listvivants = message.guild.roles.get(roleDB).members.map(m=>m.user.username)
       var vivants = Listvivants.join(', ')

       var rolajouer = []
       var messNuit;

       var embed = new Discord.RichEmbed()
          .setTitle("La nuit")
          .setDescription("La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour.")
          distribRoles.forEach(role => {
            if(rolesDeNuit.includes(role[1])){
              if(role[1] === LG && !rolajouer.includes(LG)){
              embed.addField(role[1],"N'a pas encore agi")
              rolajouer.push(role[1])
              }
            }
          });
          message.channel.send(embed).then(function(message){
            messNuit = message;
          })


          collector = message.channel.createCollector(filter)
          collector.on('collect', message => {


            contenu = message.content.toLowerCase();
            var spliteMessage = contenu.split(' ')

            var embed2 = new Discord.RichEmbed()
              .setTitle("La nuit")
              .setDescription("La liste des rôles qui n'ont pas encore agi apparaît ci-dessous. Citez-en un pour déclencher son tour.")  
            

            //Action nocturne des Loups Garous
            if(IDlg.includes(contenu) && rolajouer.includes(LG)){
              joueursLG.forEach(joueur => {
                lieu.overwritePermissions(joueur, {'SEND_MESSAGE':true})
              });
              lieu.send("Loups Garous ! Réveillez-vous et dévorez !")
              rolajouer.splice(rolajouer.indexOf(LG),1)
            }

            //Action nocturne du Cupidon
            else if(IDcupi.includes(contenu) && rolajouer.includes(Cupi)){
              var item = distribRoles[findItemInList(distribRoles,Cupi)]
              var chan = item[2].dmChannel
              chan.send("Réveille toi, Cupidon ! Quels joueurs vas-tu unir par les liens indestructibles de l'amour ? \n" + vivants + " ?");
              var collectorLove = chan.createCollector(filter2)
              var eux = []
              var ask = true

              collectorLove.on('collect', mess => {
                logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
                var splitemess = mess.content.toLowerCase().split(" ");

                splitemess.forEach(mess => {
                  distribRoles.forEach(role => {
                    if(role[2].username.toLowerCase() === mess){
                      eux.push(role);
                    }
                  });
                });
                if(eux.length === 2 && ask){
                  ask = false;
                  mess.channel.send("**" + eux[0][2].username + "** et **" + eux[1][2].username + "** ? (Oui/Non)")
                  var collectorConf = mess.channel.createCollector(filter2)
                  collectorConf.on('collect', message => {
                    if(message.content.toLowerCase() === "non" || message.content.toLowerCase() === "n"){
                      eux = []
                      ask = true
                      collectorConf.stop()
                    }
                    else if(message.content.toLowerCase() === "oui" || message.content.toLowerCase === "o"){
                        collectorConf.stop();
                        collectorLove.stop();  
                        mess.channel.send("Flèches envoyées.")
                        var chan2 = eux[0][2].dmChannel
                        chan2.send("Tu es amoureux(se) de **" + eux[1][2].username + "** ! Si l'un de vous meurt, l'autre ira de le rejoindre de tristesse.")
                        var chan3 = eux[1][2].dmChannel
                        chan3.send("Tu es amoureux(se) de **" + eux[0][2].username + "** ! Si l'un de vous meurt, l'autre ira de le rejoindre de tristesse.")
                        eux = []
                      }
                      else {
                        message.channel.send("Il faut répondre par oui ou par non !")
                      }
                  })
                }
                else if(ask && eux.length != 2){
                  mess.channel.send("Il faut 2 amoureux !")
                }
              })
              rolesDeNuit.splice(rolesDeNuit.indexOf(Cupi),1)
              rolajouer.splice(rolajouer.indexOf(Cupi),1)
            }

            //Action nocturne de la Voyante
            else if(IDvovo.includes(contenu) && rolajouer.includes(Vovo)){
              
              rolajouer.splice(rolajouer.indexOf(Vovo),1)
              var item = distribRoles[findItemInList(distribRoles,Vovo)]
              var chan = item[2].dmChannel
              chan.send("Réveille toi, Voyante ! De quel joueur veux-tu connaître le rôle cette nuit ? \n" + vivants + " ?");
              collector2 = chan.createCollector(filter2)
              collector2.on('collect', mess => {
                if(vivants.includes(mess.content)){
                  var lui = [];
                  distribRoles.forEach(role => {
                    if(role[2].username.toLowerCase() === mess.content.toLowerCase()){
                      lui = role
                    }
                  });
                  if(lui === undefined){
                    message.channel.send("Ce joueur est invisible, choisis-en un autre")
                  } else {
                  mess.channel.send(mess + " est " + lui[1])
                  collector2.stop();
                  }
                }
                logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
              })
            }

            //Action nocture de la Sorcière
            else if(IDsoso.includes(spliteMessage[0]) && rolajouer.includes(Soso)){

              rolajouer.splice(rolajouer.indexOf(Soso),1)
              var victime = "";
              if(spliteMessage.length != 2){
                message.reply("Quel est la victime de la nuit ?")
              } else {
                var previct = message.guild.member(message.mentions.users.first())
                if(spliteMessage[1] != "personne" && previct != null){
                  victime = previct.user.username;
                } else{
                  victime = " personne !"
                }
              var item = distribRoles[findItemInList(distribRoles,Soso)]
              var chan = item[2].dmChannel
              var pots = ""
              var info = ""
              if(potVie){
                info = "La victime des loups-garous ce soir est **" + victime + "**, veux tu la sauver ? (Oui/Non)"
                if(potMort){
                pots = "la potion de vie et la potion de mort" 

              } else{
                pots = "la potion de vie"
              }
            }
            else if(potMort && !potVie){
              pots = "la potion de mort"
            }
              chan.send("Réveille toi, Sorcière ! " + info + " Il te reste " + pots + ".");
              
              collectorVie = chan.createCollector(filter2)
              collectorVie.on('collect', mess => {
                var contenu = mess.content.toLowerCase()
                if(contenu === "oui" || contenu === "o" || contenu === victime.toLowerCase()){
                  mess.channel.send(victime + " ne mourra pas ce soir.")
                  collectorVie.stop();
                }
                else if(contenu === "non" || contenu === "n"){
                  mess.channel.send("Quelqu'un d'autre sauvera " + victime + ". Peut être.")
                  collectorVie.stop();
                }
                else{
                  mess.channel.send("Veux-tu utiliser la potion de vie ? (Oui/Non)");
                }
                logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
              })
              collectorVie.on('end', collected => {
                if(potMort){
                  chan.send("Sur qui souhaites-tu utiliser la potion de mort ? \n"+ vivants + ", personne ?")
                collectorMort = chan.createCollector(filter2)
                collectorMort.on('collect', mess => {
                if(vivants.includes(mess.content)){
                  var lui = [];
                  distribRoles.forEach(role => {
                    if(role[2].username === mess.content){
                      lui = role
                    }
                  });
                  if(lui === undefined){
                    message.channel.send("Ce joueur est invisible, choisis-en un autre")
                  } else {
                  mess.channel.send("Tu as tué " + mess)
                  collectorMort.stop();
                  }
                }
                else if(mess.content.toLowerCase() ===  "personne" || mess.content.toLowerCase() === "non"){
                  mess.channel.send("Tu as décidé de ne tuer personne cette nuit.")
                  collectorMort.stop()
                }
                logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
              })
            }
              });
              
            }
          }

          //Action nocturne du Salvateur
           else if(IDsalva.includes(contenu) && rolajouer.includes(Salva)){
            var item = distribRoles[findItemInList(distribRoles,Salva)]
            var chan = item[2].dmChannel
            rolajouer.splice(rolajouer.indexOf(Salva),1)

            chan.send("Réveille toi, Salvateur ! Qui vas-tu protéger cette nuit ? \n" + vivants + " ?");
            collector2 = chan.createCollector(filter2)
            collector2.on('collect', mess => {
              if(vivants.includes(mess.content)){
                var lui = [];
                distribRoles.forEach(role => {
                  if(role[2].username.toLowerCase() === mess.content.toLowerCase()){
                    lui = role
                  }
                });
                if(lui[2] === undefined){
                  mess.channel.send("Ce joueur est invisible, choisis-en un autre")
                } else {
                  if(protect != mess.content.toLowerCase()){
                    protect = lui[2].username.toLowerCase();
                    mess.channel.send(mess.content + " est protégé pour cette nuit. Il ne mourra pas si les  loups-garous décident de l'attaquer.")
                    
                    collector2.stop();
                  } else {
                    mess.channel.send("Impossible de protéger de nuit de suite la même personne !")
                  }
                }
              }
              logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
            })
          }

          //Action nocturne du Joueur de flûte
            else if(IDjdf.includes(contenu) && rolajouer.includes(JDF)){
            var ask = true;
            var item = distribRoles[findItemInList(distribRoles,JDF)]
            var chan = item[2].dmChannel
            var acharme = [];
            charmes.forEach(charme => {
              Listvivants.forEach(vivant => {
                if(vivant != charme.user.username){
                  acharme.push(vivant)
                }
              });
            });
            if(acharme[0] === undefined){
              acharme = Listvivants
            }
            chan.send("Réveille toi, Joueur de flûte ! Quels joueurs vas-tu charmer cette nuit ? \n" + acharme.join(',  ') + " ?");
            acharme = []
            collector2 = chan.createCollector(filter2)
            var eux = []

            collector2.on('collect', mess => {
              logs.send(item[2].username + ", " + item[1] + " : " + mess.content)
              var splitemess = mess.content.toLowerCase().split(" ");

              splitemess.forEach(mess => {
                distribRoles.forEach(role => {
                  if(role[2].username.toLowerCase() === mess){
                    eux.push(role);
                  }
                });
              });
              if(eux.length === 2 && ask){
                ask = false
                mess.channel.send("**" + eux[0][2].username + "** et **" + eux[1][2].username + "** ? (Oui/Non)")
                collector3 = mess.channel.createCollector(filter2)
                collector3.on('collect', message =>{
                  if(message.content.toLowerCase() === "non" || message.content.toLowerCase() === "n"){
                    eux = []
                    ask = true
                    collector3.stop()
                  }
                  else if(message.content.toLowerCase() === "oui" || message.content.toLowerCase === "o"){
                    
                    collector3.stop();
                    collector2.stop();  
                    mess.channel.send("Les voilà charmés..")

                      eux.forEach(lui => {
                        lieu2.overwritePermissions(lui[0],{'VIEW_CHANNEL':true, 'SEND_MESSAGES':false});
                        lieu2.send(lui[0] + " vient de se faire charmer !");
                        charmes.push(lui[0]);
                      });

                    }
                    else{
                      message.channel.send("Il faut répondre par oui ou par non !")
                    }
                })
              }
              else if(eux.length === 1 && ask){
                ask = false;
                mess.channel.send("**" + eux[0][2].username + "** ? (Oui/Non)")
                collector4 = mess.channel.createCollector(filter2)
                collector4.on('collect', message =>{
                  if(message.content.toLowerCase() === "non" || message.content.toLowerCase() === "n"){
                    eux = []
                    ask = true;
                    collector4.stop()
                  }
                  else if(message.content.toLowerCase() === "oui" || message.content.toLowerCase === "o"){
                      mess.channel.send("Le voilà charmé...")
                      ask = false
                      lui = eux[0][0]

                      lieu2.overwritePermissions(lui,{'VIEW_CHANNEL':true, 'SEND_MESSAGES':false});
                      lieu2.send(lui + " vient de se faire charmer !");
                      charmes.push(lui);

                      collector4.stop();
                      collector2.stop();
                    }
                    else{
                      message.channel.send("Il faut répondre par oui ou par non !")
                    }
                  });
              }
              else if(mess.content === "personne" && ask){
                ask = false
                message.channel.send("Personne ne sera charmé cette nuit")
                collector2.stop()
              }
            })
            rolajouer.splice(rolajouer.indexOf(JDF),1)
          }

          message.delete();
          rolajouer.forEach(role => {
            embed2.addField(role,"N'a pas encore agi")
          });
          if(rolajouer.length === 0){
            embed2.addField("Nuit terminée","Tous les rôles ont étés appelés, s'ils ont tous répondu, la nuit peut s'achever.")
          }
          
          messNuit.edit(embed2)
          })
          collector.on('end', collected => {
            message.channel.send("Collecteur terminé.")
          })
    }
  }

  //Prépare la composition de la partie
  else if(spliteMessage[0] === prefix + 'compo'){
    if(adminlist.includes(message.author) || mini === true){
      gameOn = true;
    message.delete();
               compo = []
                      var embed = new Discord.RichEmbed()
                        .setTitle("Composition de la partie :")
                        .setDescription("Préparez la composition de la partie à l'aide des commandes ci-dessous.")
                        .addField("**__Informations__**" ," Vous pouvez ajouter des rôles en tapant ``+ [rôle] [nombre]`` et en retirer en tapant ``- [rôle] [nombre]``. Par défaut, le nombre est de 1.\n Vous pouvez vérifier la liste des rôles reconnus en tapant ``roles?``, annuler en tapant ``annuler``, et si vous avez terminé, tapez ``terminé``.")
                        
                      message.channel.send(embed)
                      collector2 = message.channel.createCollector(filter);
                      prepCompo(collector2);
}
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
}

  //Envoie les rôles à tous les inscrits
  else if(spliteMessage[0] === prefix + 'distribution'){
    if(adminlist.includes(message.author) || mini === true){
      if(compoDone){


        getPlaceInDb("logs",message)
        var logs = message.guild.channels.get(lieuDB)

        getPlaceInDb("loups",message)
        var lieuLG = lieuDB;

        var mess = message;

            var distribText = "";
            compo.forEach(role => {
              for (let i = 0; i < compo[compo.indexOf(role)][1]; i++) {
                distribution.push(compo[compo.indexOf(role)][0])
              }
            });
            inscrits.forEach(inscrit => {
              var rnd = Math.floor((Math.random() * (distribution.length )) + 0);
              var roleRND = distribution[rnd]
              var joueur = message.guild.members.get(inscrit)
              
              distribRoles.push([joueur,roleRND,joueur.user])
              distribution.splice(distribution.indexOf(roleRND),1);
              joueur.createDM().then(channel => {
                channel.send("Tu es " + roleRND + " ! Merci de renvoyer un message ici (peu importe quoi) pour confirmer. \nSi tu veux savoir en quoi consiste ton rôle, fait ``/ask " + roleRND + "``, ou bien envoie un message à l'un des MJs." )
                collector = channel.createCollector(filter2)
                collector.on('collect', message => {
                  if(!valides.includes(message.channel)){
                    valides.push(message.channel)
                    var item = distribRoles[findItemInList(distribRoles,joueur)]
                    if(item[1] === LG){
                    mess.guild.channels.get(lieuLG).overwritePermissions(item[2], {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true})
                    }
                    logs.send(item[2].username + ", " + item[1] + " validé.")
                   
                  }
                  if(valides.length === inscrits.length){
                    collector.stop()
                    mess.guild.channels.get(lieuLG).send("Ce salon est destiné aux discussions nocturnes entre loups garous. Bon festin !")
                  }
                });
              })
            });
            for (let i = 0; i < distribRoles.length; i++) {
              distribText = distribText + distribRoles[i][2].username + " est " + distribRoles[i][1] + ", ";    
            }
            logs.send(distribText);
          
      }
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
            getPlaceInDb("charmed",message)
        lieu = lieuDB

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
            getPlaceInDb("charmed",message)
        lieu = lieuDB

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

  //Utilisation des potions de la Sorcière
  else if(spliteMessage[0] === prefix + 'use'){
    if(adminlist.includes(message.author) || mini === true){
      if(!findItemInList(distribRoles,Soso)){
        message.channel.send("Aucune Sorcière détectée.")
      } else {
      if(spliteMessage[1] === "vie"){
        if(potVie){
          potVie = false;
          message.channel.send("Potion de vie utilisée !")
        } else {
          message.channel.send("Potion de vie déjà utilisée !")
        }
      }
      else if(spliteMessage[1] === "mort"){
        if(potMort){
          potMort = false;
          message.channel.send("Potion de mort utilisée !")
        } else {
          message.channel.send("Potion de mort déjà utilisée !")
        }
      }
      if(!potMort && !potVie){
        rolesDeNuit.splice(rolesDeNuit.indexOf(Soso),1)
      }
    }
    }
    
    else {
      message.delete();
      message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
    }
  }

  //Casse le bot
   else if(spliteMessage[0] === prefix + 'break'){
    if(adminlist.includes(message.author) || mini === true){
    message.delete();
    message.guild.members.removeRole('27');
  }
  
  else {
    message.delete();
    message.reply("Désolé, cette commande est réservée aux maîtres du jeu.")
  }
}


  //aide sur les rôles
  else if(spliteMessage[0] === prefix + 'ask'){
    spliteMessage.splice(0,1)
    var contenu = spliteMessage.join(" ")
    if(IDlg.includes(contenu)){
      message.channel.send(embedLG);
    }
    else if(IDcupi.includes(contenu)){
      message.channel.send(embedCupi)
    }
    else if(IDancien.includes(contenu)){
      message.channel.send(embedAncien)
    }
    else if(IDchassou.includes(contenu)){
      message.channel.send(embedChass)
    }
    else if(IDsoso.includes(contenu)){
      message.channel.send(embedSoso)
    }
    else if(IDsalva.includes(contenu)){
      message.channel.send(embedSalva)
    }
    else if(IDidv.includes(contenu)){
      message.channel.send(embedIDV)
    }
    else if(IDjdf.includes(contenu)){
      message.channel.send(embedJDF)
    }
    else if(IDsv.includes(contenu)){
      message.channel.send(embedSV)
    }
    else if(IDvovo.includes(contenu)){
      message.channel.send(embedVovo)
    } else {
      message.channel.send("Je n'ai pas compris votre demande.")
    }
  }
  //aide générale
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
    getRoleInDb("vivants",reac.message)
    role = roleDB;
    if(gameOn === false){
      //Si on a atteint le maximum d'inscriptions
      if(reac.count > maxP+1){
          reac.remove(lui);
          lui.createDM().then(channel =>{
            channel.send("Inscription refusée, la partie est déjà complète. Essaie la prochaine !");
          });
    } else {
      //Sinon, et en ignorant la première réaction (celle du bot)
      if(reac.count > 1){
        inscrits.push(lui.id);
        reac.message.guild.members.get(lui.id).addRole(role);

        inscrep.push(lui)
        reac.message.edit(new Discord.RichEmbed()
        .setTitle("Inscriptions pour les parties de loup Garou")
        .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
        .addField("Joueurs inscrits :", inscrep));
        }
      }
      }else {
        lui.createDM().then(channel =>{
        reac.remove(lui);
        channel.send("Une partie est déjà en cours, il est impossible de s'inscrire !");
        });
    }
  }

  else if(votes.includes(reac.message)){
    if(!avote.includes(lui)){
      if(!lui.bot){
      avote.push(lui);
      }
    } else {
      avote.push(lui);
      reac.remove(lui);
      console.log(lui.username + " déréacté.");
    }
  }
})

bot.on('messageReactionRemove', (reac,lui) => {
  if(reac.message === inscr){

          getRoleInDb("vivants",reac.message)
          role= roleDB;
        if(inscrep.includes(lui)){
        inscrep.splice(inscrep.indexOf(lui),1);
        inscrits.splice(inscrits.indexOf(lui),1)
        reac.message.guild.members.get(lui.id).removeRole(role);
        reac.message.edit(new Discord.RichEmbed()
        .setTitle("Inscriptions pour les parties de loup Garou")
        .setDescription("Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" + maxP + "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription.")
        .addField("Joueurs inscrits :", "." + inscrep));
        }
  }
  
  else if(votes.includes(reac.message)){
    if(avote.includes(lui)){
      avote.splice(avote.indexOf(lui),1);
    } 
  }
})


function prepCompo(collector){

  collector.on('collect', message =>{
  const filter = m=>m.author === message.author || adminlist.includes(m.author);
    splitemess = message.content.toLowerCase().split(' ')
    var qte = 1;
    var pluriel = "" 
    var feminin = ""

    if(!isNaN(parseInt(splitemess[2]))){
      if(parseInt(splitemess[2]) > 1){
        pluriel = "s";
      }
      qte = parseInt(splitemess[2])
    }

    if(splitemess[0] === "+"){

    if(IDlg.includes(splitemess[1])){
      onAddRole(LG,emoteLG)
    }
     else if(IDcupi.includes(splitemess[1])){
      onAddRole(Cupi,emoteCupi)
    }
    else if(IDsalva.includes(splitemess[1])){
      onAddRole(Salva,emoteSalva)
    }
     else if(IDsoso.includes(splitemess[1])){
      feminin = "e"
      onAddRole(Soso,emoteSoso)
    }
      else if(IDancien.includes(splitemess[1])){
      onAddRole(Ancien,emoteAncien)
      }
     else if(IDchassou.includes(splitemess[1])){
      onAddRole(Chassou,emoteChassou)
    }
     else if(IDidv.includes(splitemess[1])){
      onAddRole(IDV,emoteIDV)
    }
      else if(IDjdf.includes(splitemess[1])){
        onAddRole(JDF,emoteJDF)
      }
      else if(IDvovo.includes(splitemess[1])){
        feminin = "e"
        onAddRole(Vovo,emoteVovo)
    }
    else if(IDsv.includes(splitemess[1])){
      onAddRole(SV,emoteSV)
    }
    else{
      nbRole -= qte;
    }
    nbRole += qte;
    message.delete();
  }
  else if(splitemess[0] === "-"){

    if(IDlg.includes(splitemess[1])){
        compo.forEach(role => {
          if(role.indexOf(LG) === 0){
            compo[compo.indexOf(role)][1] -= qte
            if(compo[compo.indexOf(role)][1] <= 0){
              compo.splice(compo.indexOf(role))
            }
            message.channel.send("**" + qte + " Loup" + pluriel +"-garou" + pluriel + "** retiré" + pluriel + " de la composition de la partie.")
          }
        });

    }
    else if(IDcupi.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Cupi) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Cupidon" + pluriel + "** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDsalva.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Salva) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Salvateur" + pluriel + "** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDsoso.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Soso) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Sorcière" + pluriel + "** retirée" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDancien.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Ancien) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Ancien" + pluriel + "** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDchassou.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Chassou) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Chasseur" + pluriel + "** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDidv.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(IDV) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Idiot" + pluriel + " du village** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDjdf.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(JDF) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Joueur" + pluriel + " de flûte** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDvovo.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(Vovo) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Voyante" + pluriel + "** retirée" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else if(IDsv.includes(splitemess[1])){
      compo.forEach(role => {
        if(role.indexOf(SV) === 0){
          compo[compo.indexOf(role)][1] -= qte
          if(compo[compo.indexOf(role)][1] <= 0){
            compo.splice(compo.indexOf(role))
          }
          message.channel.send("**" + qte + " Simple" + pluriel + " Villageois** retiré" + pluriel + " de la composition de la partie.")
        }
      });
    }
    else {
      nbRole += qte;
    }
    nbRole -= qte;
    message.delete();
  }
  else if(message.content === "roles?"){
    message.channel.send("**Liste des rôles reconnus **: \n" + listeRoles)
  }
  
  else if(message.content === "annuler"){
    collector.stop()
    compo = []
    message.channel.send("Composition de la partie annulée.");
  }

  else if(message.content === "check"){
    message.channel.send("__Composition actuelle de la partie__ : " + compo)
  }

  else if(message.content === "oui" || message.content === "o" || message.content === "non" || message.content === "n"){
    return;
  }

  else if(message.content === "terminé"){
    //S'il y a moins de rôles attribués que d'inscrits
    if(nbRole < inscrits.length){
      var diffSV = inscrits.length - nbRole;
      message.channel.send("Il n'y a pas assez de rôles pour tout le monde. **" + diffSV + "** joueurs seront de **Simples Villageois**, continuer ? (Oui/Non)")
      //attente de la réponse
      collector11 = message.channel.createCollector(filter)
      collector11.on('collect', message => {
        //Si c'est validé, on complète la composition avec de simples villageois
        if(message.content === "oui"  || message.content === "o"){
          //Et on peut arrêter le collecteur de la composition ainsi que celui-là
          collector.stop()
          collector11.stop()
          
          //La grammaire, très important
          if(diffSV > 1){
            pluriel = "s"
          }
          //Fill de la composition
            qte = diffSV
            onAddRole(SV,emoteSV)
            annonceCompo(message);
        }

        else if(message === "non" || message === "n"){
          message.channel.send("Il reste " + diffSV + " rôles à attribuer.");
          collector11.stop();
        }
      })
    }
    else if(nbRole > inscrits.length){
      var diff = nbRole - inscrits.length
      message.channel.send("Il y a trop de rôles par rapport au nombre d'inscrits. Veuillez retirer **" + diff + "** rôles en utilisant ``- [rôle] [nombre]``")

    }
    else{
      collector.stop();
      annonceCompo(message);
    }
    function annonceCompo(message){
       //Préparation du message final
       var embed = new Discord.RichEmbed()
       .setTitle("Composition de la partie")
       .setDescription("Composition pour une partie de **" + inscrits.length + "** joueurs.")
       .setThumbnail("https://images.ecosia.org/usDAmTwJGwk-iLDbV9SuUYP6Tz4=/0x390/smart/http%3A%2F%2Fgusandcodotnet.files.wordpress.com%2F2011%2F03%2Floups-garous-loup-large.jpg")
       //Va, pour chaque rôle présent dans la liste compo[réer un champs pour l'afficher
       compo.forEach(role => {
         embed.addField(compo[compo.indexOf(role)][1] + " " + compo[compo.indexOf(role)][0],compo[compo.indexOf(role)][2])
     });
     message.channel.send(embed);
     message.channel.send("Pour envoyer la composition dans le salon de discussion du jour, tapez ``send``. Elle y sera aussi épinglée. Sinon, tapez ``fin``.")
     compoDone = true;      
           //Création d'un collecteur pour attendre la réponse
           collector22 = message.channel.createCollector(filter);
           collector22.on('collect', message => {
             //Si c'est validé
             if(message.content === "send"){
               //On récupère le salon de la place du village
                          getPlaceInDb("village",message)
               lieu = lieuDB
               //Et on y envoie l'embed
               message.guild.channels.get(lieu).send(embed).then(function(message){
                 //Avant de la pin, et de récupérer le message pour pouvoir l'unpin
                 message.pin()
                 messCompo = message;
                 collector22.stop()
               })
             }
             else if(message.content === "fin"){
               collector22.stop()
             }
             else{
               message.channel.send("Veuillez répondre avec ``send`` ou ``fin``")
             }
           })
    }
  }

  else{
    message.channel.send("Commande non reconnue. Veuillez réessayer, ou ``annuler`` pour quitter.")
  }

  function onAddRole(role,emote){
    if(compo.length === 0){
      compo.push([role,qte,emote]);
    } else {
    var i = 0;
    compo.forEach(Role => {
      if(Role.indexOf(role) === 0){
        compo[compo.indexOf(Role)][1] += qte
       }
       else {
        i++;
       }
      })
      if(i === compo.length){
        compo.push([role,qte,emote])
      }
    }


      message.channel.send("**" + qte + " " + role + pluriel + "** ajouté" + feminin + pluriel + " à la composition de la partie.")

  }
  })
}


function reviveAll(message){

  getRoleInDb("morts",message)
  role= roleDB;

  getRoleInDb("vivants",message)
  role2= roleDB;
 
  eux = message.guild.roles.get(role).members;
  eux.forEach(lui => {
  lui.removeRole(role);
  lui.addRole(role2);
  });
  console.log("Réussite du reviveall");
}

function mute(role,message){
  
  message.guild.roles.get(role).members.forEach(membre => {
    membre.setMute(true);
  })

}

function unmute(role,message){
  message.guild.roles.get(role).members.forEach(membre => {
    membre.setMute(false);
  })
}

function voteJour(message){
          votes = [];
          avote = [];
          var previvant = [];
              
          getRoleInDb("vivants",previvant,message)
          Jvivants = roleDB;
          
          getPlaceInDb("votes",message)
          lieu = lieuDB;
          
          vivants = Array.from(message.guild.roles.get(Jvivants).members.values())
          for(var i = 0; i < vivants.length; i++){
            message.guild.channels.get(lieu).send(" " +  vivants[i]).then(function(message){
            message.react('👎');
            votes.push(message);
            });
          }
}

function getRoleInDb(role,message){
  junk =[]
  while(true){
    var truc = db.get(`roles`).map("id").value().indexOf(role,truc);
    if(truc === -1){
      break;
    } else {
    junk.push(truc);
    truc += 1;
    }
    }
      junk.forEach(minijunk => {
        if(db.get(`roles[${minijunk}].guild`).value() === message.guild.id){
          roleDB = db.get(`roles[${minijunk}].story_value`).value()
          return(db.get(`roles[${minijunk}].story_value`).value())
        } else {return false}
      });
}

function getPlaceInDb(salon,message){
  var junk =[]
  while(true){
    var truc = db.get(`salons`).map("id").value().indexOf(salon,truc);
    if(truc === -1){
      break;
    } else {
    junk.push(truc);
    truc += 1;
    }
  }
      junk.forEach(minijunk => {
        if(db.get(`salons[${minijunk}].guild`).value() === message.guild.id){
          lieuDB = db.get(`salons[${minijunk}].story_value`).value();
          return lieuDB;
        } else {return false}
      });
}

function findItemInList(list,item){
  var fail = 0
  var temi;
  list.forEach(element => {
    if(element.indexOf(item) != -1){
        temi = list.indexOf(element);
      }
    else{
      fail++;
    }});
  if(fail === list.length){
    return false
  } else {
    return temi
  }
}

function checkmin(message){
  if(message.channel.type != "dm"){
  var lui = db.get('ministrateurs').map("story_value").value().toString()
  if(lui.includes(message.author)){
   var lui2 = db.get('ministrateurs').map("story_value").value().indexOf(message.author.toString());
   if(db.get(`ministrateurs[${lui2}].guild`).value() === message.guild.id){
     mini = true;; 
   }
  }
}
}

function Activity(){
  actif = setInterval(function(){console.log('ping')},540000);
  //setInterval(function(){message.guild.channels.get('554786165664776232').send("ping")},540000);
}

 embedLG = new Discord.RichEmbed()
.setTitle("Le Loup-Garou")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=2&name=Loup-Garou)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte2.png")
.setColor("#FF0000")
.addField("Son but","Dévorer tous les innocents, ceux qui ne sont pas Loup-Garou.")
.addField("Comment ?","Chaque nuit, il se réunit avec les autres Loup-Garou dans un salon privé pour dévorer un joueur.")
.addField("Quand gagne-t-il ?","Lorsque tous les innocents sont morts, il obtient une victoire de Loup-Garou.")

var embedSV = new Discord.RichEmbed()
.setTitle("Le Simple Villageois [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=1&name=Simple%20Villageois)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte1.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Aucun.")

var embedSoso = new Discord.RichEmbed()
.setTitle("La Sorcière [Innocente]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=5&name=Sorci%C3%A8re  )")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte5.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Elle dispose de deux potions à usage unique : 1 potion de vie, pour sauver la victime des Loups-Garous la nuit, et 1 potion de mort, pour tuer un joueur, sans qu'il puisse être sauvé")

var embedSalva = new Discord.RichEmbed()
.setTitle("Le Salvateur [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=4&name=Salvateur)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte4.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Chaque nuit, il peut protéger un joueur de l'attaque des Loups-Garous. Si ce joueur est désigné par les Loups-Garous, il ne mourra pas. Il peut se protéger lui-même, mais pas deux nuits de suite la même personne.")

var embedChass = new Discord.RichEmbed()
.setTitle("Le Chasseur [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=6&name=Chasseur)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte6.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","A sa mort, il dispose d'un dernier souffle pour tuer la personne de son choix.")

var embedCupi = new Discord.RichEmbed()
.setTitle("Le Cupidon [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=7&name=Cupidon)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte7.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Au début de la partie, il doit désigner deux joueurs qui seront dès lors amoureux : Si l'un des deux vient à mourir, l'autre se suicide de tristesse dans la foulée.")

var embedVovo = new Discord.RichEmbed()
.setTitle("La Voyante [Innocente]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=3&name=Voyante)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte3.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Chaque nuit, elle peut désigner un joueur dont elle verra le rôle.")

var embedAncien = new Discord.RichEmbed()
.setTitle("L'Ancien [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=8&name=Ancien)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte8.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Il survit à la première attaque des Loups-Garous, mais s'il est pendu par le village, tous les innocents perdent leurs pouvoirs")

var embedIDV = new Discord.RichEmbed()
.setTitle("L'Idiot Du Village [Innocent]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=13&name=Idiot%20du%20Village)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte13.png")
.setColor("#FFFFFF")
.addField("Son but","Déterminer qui sont les **Loups-Garous** et les éliminer.")
.addField("Quand gagne-t-il ?","Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village.")
.addField("Pouvoir","Si le village tente de pendre l'Idiot, il se retient au dernier instant, devant sa bêtise. L'Idiot du village est gracié, mais en échange, il ne peut plus voter.")

var embedJDF = new Discord.RichEmbed()
.setTitle("Le Joueur De Flûte [Solitaire]")
.setDescription("[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=15&name=Joueur%20de%20Fl%C3%BBte)")
.setThumbnail("https://www.loups-garous-en-ligne.com/jeu/assets/images/carte15.png")
.setColor("#8B008B")
.addField("Son but","Charmer tous les habitants du village.")
.addField("Quand gagne-t-il ?","Lorsque l'intégralité des joueurs vivants est charmée, il remporte une victoire de Flûtiste.")
.addField("Pouvoir","Chaque nuit, il peut charmer jusqu'à 2 joueurs. Ces joueurs sont informés de leurs enchantement, et savent qui sont les autres personnes charmées. Le charme n'a aucun impact sur les personnages ou la façon de jouer.")

let poem = "Quand la lune blanche \nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir,\nFol alors qui livre\nA la nuit son livre\nSavant,\nSon pied aux collines,\nEt ses mandolines\nAu vent ;\nFol qui dit un conte,\nCar minuit qui compte\nLe temps,\nPasse avec le prince\nDes sabbats qui grince\nDes dents.\nL’amant qui compare\nQuelque beauté rare\nAu jour,\nTire une ballade\nDe son coeur malade\nD’amour.\nMais voici dans l’ombre\nQu’une ronde sombre\nSe fait,\nL’enfer autour danse,\nTous dans un silence\nParfait.\nTout pendu de Grève,\nTout Juif mort soulève\nSon front,\nTous noyés des havres\nPressent leurs cadavres\nEn rond.\nEt les âmes feues\nJoignent leurs mains bleues\nSans os ;\nLui tranquille chante\nD’une voix touchante\nSes maux.\nMais lorsque sa harpe,\nOù flotte une écharpe,\nSe tait,\nIl veut fuir… La danse\nL’entoure en silence\nParfait.\nLe cercle l’embrasse,\nSon pied s’entrelace\nAux morts,\nSa tête se brise\nSur la terre grise !\nAlors\nLa ronde contente,\nEn ris éclatante,\nLe prend ;\nTout mort sans rancune\nTrouve au clair de lune\nSon rang.\nCar la lune blanche\nS’accroche à la branche\nPour voir\nSi quelque feu rouge\nDans l’horizon bouge\nLe soir.\nAlfred de Musset, Poésies posthumes"