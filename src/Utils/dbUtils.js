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
  }
};

module.exports = methods;
