const Discord = require("discord.js");
const dbutils = require("./Utils/dbUtils.js");

var checkmin = function(message) {
  var minis = dbutils.getAllValuesInDb("db", "ministrateurs", "story_value");

  if (minis.toString().includes(message.author)) {
    var lui = minis.indexOf(message.author.toString());

    //lui.guild correspond à l'ID de la guild stockée dans la db
    if (lui.guild === message.guild.id) {
      return true;
    }
  }
  return false;
};

module.exports = checkmin;
