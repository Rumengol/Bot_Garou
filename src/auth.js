const Discord = require("discord.js");
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);

var checkmin = function(message) {
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
};

module.exports = checkmin;
