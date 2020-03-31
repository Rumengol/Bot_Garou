exports.run = (client, message, args) => {
  if (args.length === 1) {
    message.guild.member(message.mentions.users.first()).setMute(true);
    message.channel.send(
      message.guild.member(message.mentions.users.first()) + " est mute !"
    );
  } else {
    message.reply("Qui dois-je mute ?");
  }
};
