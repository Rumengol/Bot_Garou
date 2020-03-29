const datas = require("../../global.js");
const utils = require("./Utils.js")

var methods = {
    prepCompo : function(collector){
        collector.on("collect", message => {
            const filter = m =>
            m.author === message.author || datas.adminlist.includes(m.author);
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
              if (datas.IDlg[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.LG[message.guild.id], datas.emoteLG[message.guild.id]);
              } else if (datas.IDcupi[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Cupi[message.guild.id], datas.emoteCupi[message.guild.id]);
              } else if (datas.IDsalva[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Salva[message.guild.id], datas.emoteSalva[message.guild.id]);
              } else if (datas.IDsoso[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Soso[message.guild.id], datas.emoteSoso[message.guild.id]);
              } else if (datas.IDancien[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Ancien[message.guild.id], datas.emoteAncien[message.guild.id]);
              } else if (datas.IDchassou[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Chassou[message.guild.id], datas.emoteChassou[message.guild.id]);
              } else if (datas.IDidv[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.IDV[message.guild.id], datas.emoteIDV[message.guild.id]);
              } else if (datas.IDjdf[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.JDF[message.guild.id], datas.emoteJDF[message.guild.id]);
              } else if (datas.IDvovo[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.Vovo[message.guild.id], datas.emoteVovo[message.guild.id]);
              } else if (datas.IDsv[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.SV[message.guild.id], datas.emoteSV[message.guild.id]);
              } else if (datas.IDbe[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.BE[message.guild.id], datas.emoteBE[message.guild.id])
              } else if (datas.IDpf[message.guild.id].includes(splitemess[1])) {
                this.onAddRole(datas.PF[message.guild.id], datas.emotePF[message.guild.id])
              }
              else {
                datas.nbRole[message.guild.id] -= qte;
              }
              datas.nbRole[message.guild.id] += qte;
              message.delete();
            } else if (splitemess[0] === "-") {
              if (datas.IDlg[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.LG[message.guild.id]);
              } else if (datas.IDcupi[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Cupi[message.guild.id]);
              } else if (datas.IDsalva[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Salva[message.guild.id]);
              } else if (datas.IDsoso[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Soso[message.guild.id]);
              } else if (datas.IDancien[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Ancien[message.guild.id]);
              } else if (datas.IDchassou[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Chassou[message.guild.id]);
              } else if (datas.IDidv[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.IDV[message.guild.id]);
              } else if (datas.IDjdf[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.JDF[message.guild.id]);
              } else if (datas.IDvovo[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.Vovo[message.guild.id]);
              } else if (datas.IDsv[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.SV[message.guild.id]);
              } else if (datas.IDbe[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.BE[message.guild.id], datas.emoteBE[message.guild.id])
              } else if (datas.IDpf[message.guild.id].includes(splitemess[1])) {
                this.onSuppRole(datas.PF[message.guild.id], datas.emotePF[message.guild.id])
              } else {
                datas.nbRole[message.guild.id] += qte;
              }
              datas.nbRole[message.guild.id] -= qte;
              message.delete();
            } else if (message.content === "roles?") {
              message.channel.send("**Liste des rôles reconnus **: \n" + datas.listeRoles[message.guild.id]);
            } else if (message.content === "annuler") {
              collector.stop();
              datas.compo[message.guild.id] = [];
              message.channel.send("Composition de la partie annulée.");
            } else if (message.content === "check") {
              message.channel.send(
                "__Composition actuelle de la partie__ : " + datas.compo[message.guild.id]
              );
            }
            else if (message.content === "terminé") {
              //S'il y a moins de rôles attribués que d'inscrits
              if (datas.nbRole[message.guild.id] < datas.inscrits[message.guild.id].length) {
                var diffSV = datas.inscrits[message.guild.id].length - datas.nbRole[message.guild.id];
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
                    this.onAddRole(datas.SV[message.guild.id], datas.emoteSV[message.guild.id]);
                    this.annonceCompo(message);
                  } else if (message === "non" || message === "n") {
                    message.channel.send("Il reste " + diffSV + " rôles à attribuer.");
                    collector11.stop();
                  }
                });
              } else if (datas.nbRole[message.guild.id] > datas.inscrits[message.guild.id].length) {
                var diff = datas.nbRole[message.guild.id] - datas.inscrits[message.guild.id].length;
                message.channel.send(
                  "Il y a trop de rôles par rapport au nombre d'inscrits. Veuillez retirer **" +
                  diff +
                  "** rôles en utilisant ``- [rôle] [nombre]``"
                );
              } else {
                collector.stop();
                this.annonceCompo(message);
              }
        }
    });
    },

    annonceCompo : function(message){
        //Préparation du message final
        var embed = new Discord.RichEmbed()
          .setTitle("Composition de la partie")
          .setDescription(
            "Composition pour une partie de **" +
            datas.nbRole[message.guild.id] +
            "** joueurs."
          )
          .setThumbnail(
            "https://images.ecosia.org/usDAmTwJGwk-iLDbV9SuUYP6Tz4=/0x390/smart/http%3A%2F%2Fgusandcodotnet.files.wordpress.com%2F2011%2F03%2Floups-garous-loup-large.jpg"
          );
        //Va, pour chaque rôle présent dans la liste compo, créer un champs pour l'afficher
        datas.compo[message.guild.id].forEach(role => {
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
        datas.compoDone[message.guild.id] = true;
        //Création d'un collecteur pour attendre la réponse
        collector22 = message.channel.createCollector(filter);
        collector22.on("collect", message => {
          //Si c'est validé
          if (message.content === "send") {
            //On récupère le salon de la place du village
            var lieu = utils.getPlaceInDb("village", message);
            //Et on y envoie l'embed
            message.guild.channels
              .get(lieu)
              .send(embed)
              .then(function (message) {
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
      },

    onAddRole : function(role, emote) {
        if (datas.compo[message.guild.id].length === 0) {
            datas.compo[message.guild.id].push({ Name: role, Quantite: qte, Emote: emote });
        } else {
          var i = 0;
          datas.compo[message.guild.id].forEach(Role => {
            if (Role.Name === role) {
              var item = findObjectInList(datas.compo[message.guild.id], "Name", Role.Name);
              try {
                item.Quantite += 1;
              }
              catch (e) {
                message.channel.send(`Erreur : le rôle ${role} n'a pas été trouvé dans la liste. Merci de reporter cette erreur aux administrateurs. Détail : **${e.message}**`)
              }
            } else {
              i++;
            }
          });
          if (i === datas.compo[message.guild.id].length) {
            datas.compo[message.guild.id].push({ Name: role, Quantite: qte, Emote: emote });
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
      },

    onSuppRole : function(role) {
      datas.compo[message.guild.id].forEach(Role => {
        if (Role.Name === role) {
          var item = findObjectInList(datas.compo[message.guild.id], "Name", Role.Name);
          try {
            item.Quantite += 1;
          }
          catch (e) {
            message.channel.send(`Erreur : le rôle ${role} n'a pas été trouvé dans la liste. Merci de reporter cette erreur aux administrateurs. Détail : **${e.message}**`)
          }
          if (item.Quantite <= 0) {
            datas.compo[message.guild.id].splice(
                datas.compo[message.guild.id].indexOf(item), 1
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
};

module.exports = methods;