const datas = require("../../global.js");
const utils = require("./Utils.js")

var methods = {
    Distribution : function(message) {

        var lieu = utils.getPlaceInDb("logs", message);
        var logs = message.guild.channels.get(lieu);
      
        var lieu2 = utils.getPlaceInDb("loups", message);
        var lieuLG = message.guild.channels.get(lieu2);
      
        //Garde en mémoire le message dans la guilde
        var mess = message
        var number = comp
          .get("composition")
          .map("id")
          .value().length;
        var valides = [];
        var once = true;
      
        var distribText = "";
        datas.compo[message.guild.id].forEach(role => {
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
}