const datas = require("../global.js");
const dbutils = require("../Utils/dbUtils.js");

module.exports = {
  name: "ping",
  description: "Vérifie si le bot est en activité",
  args: false,
  usage: "",
  guildOnly: false,
  canDo: ["All"],
  aliases: [],
  execute(client, message, args) {
    message.channel.send("Pong !");
    console.log(dbutils.getRoleInDb("vivants", message));
  }
};
