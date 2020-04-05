const helpUtils = require("../../Utils/helpUtils.js");

exports.run = (client, message, args) => {
  if (message.channel.type === "dm") {
    message.channel.send(
      "Utilisez cette commande dans un serveur pour avoir la liste des commandes que vous pouvez utiliser sur ce serveur."
    );
  }
  var lui = message.author;
  helpUtils.helpGen(message, lui);
};
