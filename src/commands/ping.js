exports.run = (client, message, args) => {
  if (client.adminlist.includes(message.author)) {
    message.reply(
      "Pong, mais depuis le command handler ! \n *Rang de l'utilisateur : Propriétaire.*"
    );
  } else if (client.mini[message.guild.id]) {
    message.reply("Pong ! \n *Rang de l'utilisateur : Administrateur local.*");
  } else {
    message.reply("Pong.");
  }
};
