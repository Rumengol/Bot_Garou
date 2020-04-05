module.exports = {
  name: "mute",
  description: "Mute (vocal) le joueur mentionné",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: [],
  execute(client, message, args) {
    message.guild.member(message.mentions.users.first()).setMute(true);
    message.channel.send(
      message.guild.member(message.mentions.users.first()) + " est mute !"
    );
  }
};
