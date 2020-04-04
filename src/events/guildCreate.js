const dbUtils = require("../Utils/dbUtils.js");
const datas = require("../../global.js");

module.exports = (client, guild) => {
  admin = "<@" + guild.owner.id + ">";
  var number = dbUtils.getAllValuesInDb("db", "ministrateurs", "id").length;
  var obj = { guild: guild.id, id: number, story_value: admin };
  dbUtils.writeInDb("db", "ministrateurs", obj);

  datas.init(guild.id);
  guild.owner.createDM().then(channel => {
    channel.send(
      "Bonjour et merci de m'avoir ajouté à **" +
        guild.name +
        "** ! Vous pouvez utiliser la configuration automatique avec `/config auto` ou configurer les salons et rôles nécessaires en suivant _le manuel d'utilisation_. \n Vous pouvez également ajouter d'autres utilisateurs afin qu'ils puissent masteriser des parties en utilisant `/defadminhere [@user]`. \n Pour connaître la liste des commandes disponibles, utilisez la commande `/help` (vous ne verrez l'intégralité des commandes que sur votre serveur)."
    );
  });
};
