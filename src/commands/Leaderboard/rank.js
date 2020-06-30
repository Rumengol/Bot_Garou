const dbutils = require("../../Utils/dbUtils.js");
const datas = require("../../global.js");

module.exports = {
  name: "rank",
  description:
    "Affiche le rang de l'utilisateur mentionné (celui de l'utilisateur de la commande s'il n'est pas précisé)",
  args: false,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["All"],
  aliases: [],
  execute(client, message, args) {
    message.reply("On dirait que tu n'es pas encore classé !");
  }
};
