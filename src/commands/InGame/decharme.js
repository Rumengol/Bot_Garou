const datas = require("../../global.js");
const utils = require("../../Utils/Utils.js");

exports.run = (client, message, args) => {
  if (args.length == 1) {
    message.delete();
    let lui = message.guild.member(message.mentions.users.first());
    if (lui === null) {
      message.reply("Veuillez mentionner un utilisateur valide.");
    } else {
      var charmeID = utils.getPlaceInDb("charmed", message);
      var charmeChan = message.guild.channels.get(charmeID);

      charmeChan.overwritePermissions(lui, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
      });
      datas.charmes[message.guild.id].splice(
        datas.charmes[message.guild.id].indexOf(lui),
        1
      );
    }
  } else {
    message.delete();
    message.channel.send(
      "Formulation incorrecte. La bonne syntaxe est ``/decharme @[utilisateur]``"
    );
  }
};
