const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json")
const db = low(adapter)
const identifiers = require("../../identifiers.json")
const utils = require("../Utils.js")

exports.run = (client, message, args) => {
    if (args[2] != null) {
        if (identifiers.roles.split(",").includes(args[2])) {
            var role = utils.getRoleInDb(args[2], message);
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
                                id: args[2],
                                story_value: args[1]
                            })
                            .write();
                        db.get("roles")
                            .remove({
                                guild: message.guild.id,
                                id: args[2],
                                story_value: role
                            })
                            .write();
                        message.channel.send(
                            "<@&" +
                            args[1] +
                            ">" +
                            " ajouté comme rôle des " +
                            args[2]
                        );
                        collector.stop();
                    } else if (message.content.toLowerCase() === "non") {
                        //S'il répond non, la commande est annulée
                        message.channel
                            .send("Commande annulée.")
                            .then(function (temp) {
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
                        id: args[2],
                        story_value: args[1]
                    })
                    .write();
                message.channel.send(
                    "<@&" +
                    args[1] +
                    ">" +
                    " ajouté comme rôle des " +
                    args[2]
                );
            }
        }
    }
}