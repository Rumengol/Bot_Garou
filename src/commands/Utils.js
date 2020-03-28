var methods = {
  /**
   *
   * @param {Discord.GuildChannel} salon Le salon à rechercher dans la base de données
   * @param {Discord.message} message Pour obtenir le serveur de la commande
   * @returns {string} L'ID du salon demandé ou false si le salon n'est pas trouvé
   */
  getPlaceInDb: function(salon, message) {
    var junk = [];
    while (true) {
      var truc = db
        .get(`salons`)
        .map("id")
        .value()
        .indexOf(salon, truc);
      if (truc === -1) {
        break;
      } else {
        junk.push(truc);
        truc += 1;
      }
    }
    junk.forEach(minijunk => {
      if (db.get(`salons[${minijunk}].guild`).value() === message.guild.id) {
        lieuDB = db.get(`salons[${minijunk}].story_value`).value();
        return lieuDB;
      } else {
        return false;
      }
    });
  },

  getRoleInDb: function(role, message) {
    junk = [];
    while (true) {
      var truc = db
        .get(`roles`)
        .map("id")
        .value()
        .indexOf(role, truc);
      if (truc === -1) {
        break;
      } else {
        junk.push(truc);
        truc += 1;
      }
    }
    junk.forEach(minijunk => {
      if (db.get(`roles[${minijunk}].guild`).value() === message.guild.id) {
        roleDB = db.get(`roles[${minijunk}].story_value`).value();
        return roleDB;
      } else {
        return false;
      }
    });
  }
};
