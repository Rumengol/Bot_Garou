exports.run = (client, message, args) => {
  if (args.length === 1) {
    if (args[1].match(/^\d+$/)) {
      var nombre = parseInt(args[0]);
      message.channel.bulkDelete(nombre + 1);
    } else {
      message.channel.send(
        "Erreur, il me faut un nombre de message à nettoyer! "
      );
    }
  }
};
