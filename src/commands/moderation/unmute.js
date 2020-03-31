exports.run = (client, message, args) => {
  if (args.length === 2) {
    message.guild.member(message.mentions.users.first()).setMute(false);
    message.channel.send(
      message.guild.member(message.mentions.users.first()) +
        " n'est plus mute !"
    );
  } else {
    message.reply("Qui dois-je unmute ?");
  }
};
