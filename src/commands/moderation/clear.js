module.exports = {
  name: "clear",
  description: "Supprime les X derniers messages",
  args: true,
  usage: "X",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    if (args[0].match(/^\d+$/)) {
      var nombre = parseInt(args[0]);
      message.channel.bulkDelete(nombre + 1);
    } else {
      message.channel.send(
        "Erreur, il me faut un nombre de message à nettoyer! "
      );
    }
  }
};
