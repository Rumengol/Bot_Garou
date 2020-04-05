const Discord = require("discord.js");
const dbutils = require("./Utils/dbUtils.js");

module.exports = {
  isAuthenticated: function(message, roles) {
    roles.foreach(role => {
      switch (role) {
        case "All":
          return true;

        case "Administrateur":
          return this.checkAdmin(message);

        case "Ministrateur":
          return this.checkmin(message);

        case "Guildmaster":
          return this.checkMaster(message);

        case "Owner":
          return this.checkOwner(message);

        default:
          return false;
      }
    });
  },

  checkAdmin: function(message) {
    var admins = dbutils.getAllValuesInDb("db", "administrateurs", "user");
    return admins.has(message.author.id);
  },

  checkmin: function(message) {
    var minis = dbutils.getAllValuesInDb("db", "ministrateurs", "story_value");

    if (minis.toString().includes(message.author)) {
      var lui = minis.indexOf(message.author.toString());

      //lui.guild correspond à l'ID de la guild stockée dans la db
      if (lui.guild === message.guild.id) {
        return true;
      }
    }
    return false;
  },

  checkMaster: function(message) {
    return message.author == message.guild.owner;
  },

  checkOwner: function(message) {
    return message.author.id == "218701822670405633";
  }
};
