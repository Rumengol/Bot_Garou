const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);

const adeupter = new FileSync("composition.json");
const comp = low(adeupter);

db.defaults({ administrateurs: [] }).write();
db.defaults({ ministrateurs: [] }).write();
db.defaults({ salons: [] }).write();
db.defaults({ roles: [] }).write();

comp.defaults({ composition: [] }).write();

var methods = {
  bases: {
    db,
    comp
  },
  /**
   * Récupère toutes les valeurs d'une colonne de la lowdb
   * @param {string} database La base de données à utiliser, entre db et comp
   * @param {string} table La table à utiliser
   * @param {string} colonne La colonne à récupérer
   */
  getAllValuesInDb: function(database, table, colonne) {
    return this.bases[database]
      .get(table)
      .map(colonne)
      .value();
  },

  writeInDb: function(database, table, object) {
    this.bases[database]
      .get(table)
      .push(object)
      .write();
  },

  removeFromDb: function(database, table, object) {
    this.bases[database]
      .get(table)
      .remove(object)
      .write();
  },

  getPlaceInDb: function(salon, message) {
    var junk = [];
    while (true) {
      var truc = this.getAllValuesInDb("db", "salons", "id").indexOf(
        salon,
        truc
      );
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
      var truc = this.getAllValuesInDb("db", "roles", "id").indexOf(role, truc);
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

module.exports = methods;
