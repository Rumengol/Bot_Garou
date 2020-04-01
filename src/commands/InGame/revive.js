var utils = require("../../Utils/Utils.js");

exports.run = (client, message, args) => {
  if (args.length === 1) {
    let lui = message.guild.member(message.mentions.users.first());
    if (lui === null) {
      message.reply(
        "Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur] ou /reviveall."
      );
    } else {
      var roleMortID = utils.getRoleInDb("morts", message);
      var roleMort = message.guild.roles.get(roleMortID);
      var roleVivID = utils.getRoleInDb("vivants", message);
      var roleViv = message.guild.roles.get(roleVivID);
      lui.addRole(roleViv);
      setTimeout(() => {
        lui.removeRole(roleMort);
      }, 1000);
      var townID = utils.getPlaceInDb("village", message);
      var town = message.guild.channels.get(townID);
      town.send(lui + " a ressuscité !");
      var vocalID = utils.getPlaceInDb("vocal", message);
      var vocal = message.guild.channels.get(vocalID);
      if (vocal.members.has(lui)) lui.setMute(false);
    }
  } else {
    message.reply(
      "Formulation incorrecte. La bonne syntaxe est : /revive @[utilisateur]."
    );
  }
};
