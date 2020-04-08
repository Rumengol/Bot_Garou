const identifiers = require("../../identifiers.json");
const dbUtils = require("../../Utils/dbUtils.js");
const utils = require("../../Utils/Utils.js");

module.exports = {
  name: "addrole",
  description: "Ajoute un rôle du serveur dans la base de données",
  args: true,
  usage: "[ID role] [identifiant]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["newrole"],
  execute(client, message, args) {
    if (identifiers.roles.split(",").includes(args[1])) {
      var role = utils.getRoleInDb(args[1], message);
      var obj = {
        guild: message.guild.id,
        id: args[1],
        story_value: args[0]
      };
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
            dbUtils.writeInDb("db", "roles", obj);

            var obj2 = {
              guild: message.guild.id,
              id: args[1],
              story_value: role
            };
            dbUtils.removeFromDb("db", "roles", obj2);

            message.channel.send(
              "<@&" + args[0] + ">" + " ajouté comme rôle des " + args[1]
            );
            collector.stop();
          } else if (message.content.toLowerCase() === "non") {
            //S'il répond non, la commande est annulée
            message.channel.send("Commande annulée.").then(function(temp) {
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
        dbUtils.writeInDb("db", "roles", obj);
        message.channel.send(
          "<@&" + args[0] + ">" + " ajouté comme rôle des " + args[1]
        );
      }
    }
  }
};
