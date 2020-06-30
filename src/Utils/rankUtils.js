const dbUtils = require("./dbUtils.js");

var methods = {
  scoreUp: function(playerId, amount) {
    var player = dbUtils.getObjectInDb("ldb", "leaderboard", playerId);

    if (player == undefined) {
      player = this.addNewPlayer(playerId);
    }

    player.score += amount;
    player.xp += 1;

    player.title = this.checkTitle(player);

    dbUtils.updateDB("ldb", "leaderboard", player, playerId);
  },

  addNewPlayer: function(playerId) {
    var player = {
      id: playerId,
      xp: 0,
      score: 0,
      title: ""
    };
    dbUtils.writeInDb("ldb", "leaderboard", player);

    return dbUtils.getObjectInDb("ldb", "leaderboard", playerId);
  },

  checkTitle: function(player) {
    switch (player.score) {
      case 1:
        return "Agneau";
      case 11:
        return "Louveteau";
      case 30:
        return "Loup des bois";
      case 100:
        return "Grand Méchant Loup";
      case 200:
        return "Loup dans la bergerie";

      default:
        return player.title;
    }
  }
};

module.exports = methods;
