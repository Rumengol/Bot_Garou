const low = require("lowdb")
const adapter = new FileSync("adminrole.json")
const db = low(adapter)
const identifiers = require("../../identifiers.json")
const shared = require("../Shared")

exports.run = (client, message, args) => {
    maxP[message.guild.id] = args[1];
    message.delete();
    inscrEmbed[message.guild.id] = new Discord.RichEmbed()
        .setTitle("Inscriptions pour les parties de loup Garou")
        .setDescription(
            "Inscrivez-vous en appuyant sur la réaction ci-dessous. Inscriptions limitées à **" +
            maxP[message.guild.id] +
            "** et impossibles lorsque la partie est lancée. \n Attention. Si vous retirez votre réaction, cela sera pris comme une désinscription."
        );
    message.channel
        .send(inscrEmbed[message.guild.id])
        .then(function (message) {
            message.react("🐺").catch(console.error);
            inscr[message.guild.id] = message;
        });
}