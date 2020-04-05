const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const identifiers = require("../../identifiers.json");
const utils = require("../Utils.js");

module.exports = {
  name: "addsalon",
  description: "Ajoute un salon du serveur à l'identifiant spécifiqué",
  args: true,
  usage: "[ID Salon] [identifiant]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["newsalon"],
  execute(client, message, args) {
    //Vérification que l'identifiant fourni est reconnu
    if (identifiers.salons.split(",").includes(args[1])) {
      //Récupère le lieu dans la base de données s'il est présent
      var lieu = utils.getPlaceInDb(args[1], message);
      //Si c'est le cas
      if (lieu != null) {
        //Demande si le salon doit être remplacé
        var question = message.channel.send(
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
                id: args[1],
                story_value: args[0]
              })
              .write();
            db.get("salons")
              .remove({
                guild: message.guild.id,
                id: args[1],
                story_value: lieu
              })
              .write();
            message.channel.send(
              "<#" + args[1] + ">" + " remplacé comme salons " + args[2]
            );
            collector.stop();
          } else if (
            message.content.toLowerCase() === "non" ||
            message.content.toLowerCase() === "n"
          ) {
            //S'il répond non, la commande est annulée
            message.channel.send("Commande annulée.").then(function(temp) {
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
            id: args[1],
            story_value: args[0]
          })
          .write();
        message.channel.send(
          "<#" + args[0] + ">" + " ajouté comme salons " + args[1]
        );
      }
    }
  }
};
