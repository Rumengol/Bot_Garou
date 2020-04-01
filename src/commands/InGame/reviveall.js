var gameUtils = require("../../Utils/gameUtils.js");

exports.run = (client, message, args) => {
  gameUtils.reviveAll(message);
};
