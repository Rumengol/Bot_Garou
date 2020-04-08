const auth = require("../auth.js");

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (!message.content.startsWith(client.config.prefix)) return;

  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  //If the command needs arguments and none is given, return
  if (cmd.args && !args.length) {
    message.delete();
    let reply = "Merci de préciser les arguments de cette commande.";

    if (cmd.usage) {
      reply += `\n L'utilisation correcte est : \`/${cmd.name} ${cmd.usage}\``;
    }

    return message.channel.send(reply).then(mess => {
      setTimeout(function() {
        mess.delete();
      }, 10000);
    });
  }

  if (cmd.guildOnly && message.channel.type != "text") {
    return message.reply("Impossible d'exécuter cette commande en privé !");
  }

  if (cmd.canDo && !auth.isAuthenticated) {
    return message.channel.send(
      "Vous n'êtes pas abilité à utiliser cette commande."
    );
  }

  try {
    // Run the command
    cmd.execute(client, message, args);
  } catch (e) {
    message.channel.send("Erreur dans l'éxecution de la commande");
    console.log(e);
  }
};
