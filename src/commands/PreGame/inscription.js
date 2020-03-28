const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);
const identifiers = require("../../identifiers.json");
const datas = require("../../global.js");

exports.run = (client, message, args) => {
  datas.maxP[message.guild.id] = args[1];
  message.delete();
  datas.inscrEmbed[message.guild.id] = new Discord.RichEmbed()
    .setTitle("Inscriptions pour les parties de loup Garou")
    .setDescription(
      "Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
        datas.maxP[message.guild.id] +
        "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
    );
  message.channel
    .send(datas.inscrEmbed[message.guild.id])
    .then(function(message) {
      message.react("🐺").catch(console.error);
      datas.inscr[message.guild.id] = message;
    });
};
