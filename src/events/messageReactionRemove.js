const datas = require("../global.js");
const utils = require("../Utils/Utils.js");
const dbutils = require("../Utils/dbUtils.js");

module.exports = (client, reac, user) => {
  try {
    if (reac.message.channel.type != "dm") {
      var vivantID = dbutils.getRoleInDb("vivants", reac.message);
      var vivantRole = reac.message.guild.get(vivantID);

      if (reac.message === datas.inscr[reac.message.guild.id]) {
        if (datas.inscrep[reac.message.guild.id].includes(user)) {
          datas.inscrep[reac.message.guild.id].splice(
            datas.inscrep[reac.message.guild.id].indexOf(user),
            1
          );
          datas.inscrits[reac.message.guild.id].splice(
            datas.inscrits[reac.message.guild.id].indexOf(user.id),
            1
          );
          reac.message.guild.members.get(user.id).removeRole(vivantRole);
          reac.message.edit(
            new Discord.RichEmbed()
              .setTitle("Inscriptions pour les parties de loup Garou")
              .setDescription(
                "Inscrivez  -vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
                  datas.maxP[reac.message.guild.id] +
                  "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
              )
              .addField(
                "Joueurs inscrits :",
                "." + datas.inscrep[reac.message.guild.id]
              )
          );
        }
      } else if (datas.votes[reac.message.guild.id].includes(reac.message)) {
        if (datas.avote[reac.message.guild.id].includes(user)) {
          datas.avote[reac.message.guild.id].splice(
            datas.avote[reac.message.guild.id].indexOf(user),
            1
          );
          var item = utils.findObjectInList(
            datas.voted[reac.message.guild.id],
            "contenu",
            reac.message.content
          );
          item.votes -= 1;
        }
      }
    }
  } catch (e) {
    reac.message.channel.send(
      e.message + "\n A ```" + reac.message.content + "```."
    );
  }
};
