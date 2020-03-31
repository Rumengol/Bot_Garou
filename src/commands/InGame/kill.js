var gameUtils = require("../../Utils/gameUtils.js");

exports.run = (client, message, args) => {
  if (args.length === 1) {
    let lui = message.guild.member(message.mentions.users.first());
    if (lui === null) {
      message.reply(
        "Formulation incorrecte. La bonne syntaxe est : /Kill @[utilisateur]."
      );
    } else {
      gameUtils.Kill(message, lui);
    }
  } else {
    message.reply(
      "Formulation incorrecte. La bonne syntaxe est : /Kill @[utilisateur]."
    );
  }
};
