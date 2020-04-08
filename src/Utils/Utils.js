const dbUtils = require("./dbUtils.js");

var methods = {
  findObjectInList: function(list, property, name) {
    var temp = list.find(item => {
      return item[property] === name;
    });
    if (temp != undefined) {
      return temp;
    } else {
      return undefined;
    }
  },

  mute: function(role, message) {
    var vocalID = this.getPlaceInDb("vocal", message);
    var vocal = message.guild.channels.get(vocalID);
    role.members.forEach(membre => {
      if (vocal.members.has(membre)) membre.setMute(true);
    });
  },

  unmute: function(role, message) {
    var vocalID = this.getPlaceInDb("vocal", message);
    var vocal = message.guild.channels.get(vocalID);
    role.members.forEach(membre => {
      if (vocal.members.has(membre)) membre.setMute(false);
    });
  }
};

module.exports = methods;
