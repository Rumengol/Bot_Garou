const Discord = require("discord.js")
const low = require("lowdb")
const adapter = new FileSync("adminrole.json")
const db = low(adapter)

class Auth{
    constructor(data = {}){
        /**
         * Indique si l'auteur du message est administrateur local
         * @type {Discord.Message}
         */
        this.isLocalAdmin = checkmin(data.message)

        /**
         * Indique si l'auteur du message est administrateur
         * @type {Discord.Message}
         */
        this.isAdmin = adminlist.includes(data.message.author)
    }

/**
 * Vérifie si l'auteur d'un message est administrateur local
 * @param {Discord.Message} message
 * @returns {Boolean} Vrai si l'auteur est administrateur local, faux sinon
 */
 checkmin(message){
    var lui = db
    .get("ministrateurs")
    .map("story_value")
    .value()
    .toString();
  if (lui.includes(message.author)) {
    var lui2 = db
      .get("ministrateurs")
      .map("story_value")
      .value()
      .indexOf(message.author.toString());
    if (db.get(`ministrateurs[${lui2}].guild`).value() === message.guild.id) {
      return true;
    }
  }
  return false;
}

}
module.exports = {

}