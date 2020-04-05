module.exports = {
  name: "unmute",
  description: "Autorise le joueur mentionné à parler de nouveau",
  args: true,
  usage: "[@Membre]",
  guildOnly: true,
  canDo: ["Administrateur", "Ministrateur"],
  aliases: ["demute"],
  execute(client, message, args) {
    message.guild.member(message.mentions.users.first()).setMute(false);
    message.channel.send(
      message.guild.member(message.mentions.users.first()) +
        " n'est plus mute !"
    );
  }
};
