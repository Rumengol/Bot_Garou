const low = require("lowdb")
const adapter = new FileSync("adminrole.json")
const db = low(adapter)

exports.run = (client, message, args) => {
    if(args == null){
        message.channel.send("Il faut préciser un utilisateur.")
    }
    noadmin = spliteMessage[1];
          db.get("administrateurs")
            .remove({ story_value: noadmin })
            .write();
          message.reply(noadmin + " supprimé des administrateurs.");
        }