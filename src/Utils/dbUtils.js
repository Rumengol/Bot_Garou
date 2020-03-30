const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("adminrole.json");
const db = low(adapter);

const adeupter = new FileSync("composition.json");
const comp = low(adeupter);

var methods = {
  getAllValuesInDb: function(database, table, colonne) {
    return this[database]
      .get(table)
      .map(colonne)
      .value();
  },

  writeInDb: function(table, object) {
    this[database]
      .get(table)
      .push(object)
      .write();
  },

  removeFromDb: function(table, object) {
    this[database]
      .get(table)
      .remove(object)
      .write();
  }
};
