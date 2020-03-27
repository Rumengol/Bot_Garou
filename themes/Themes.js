const Discord = require("discord.js");
const Role = require("./Role.js");
/*const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("Presets.json");
const Presets = low(adapter);*/
const Presets = require("./Presets.json");

class Theme {
  constructor(data = {}) {
    /**
     * Nom du thème
     * @type {string}
     */
    this.name = data.name;

    /**
     * Description du thème
     * @type {string}
     */
    this.description = data.description;

    /**
     * Liste des rôles du thème
     * @type {Role[]}
     */
    this.roles = data.roles;
  }

  /**
   * Set le nom du thème
   * @param {StringResolvable} name le nom du thème
   * @returns {Theme} ce thème
   */
  setName(name) {
    var name = resolveString(name);
    this.name = name;
    return this;
  }

  /**
   * Set la description du thème
   * @param {StringResolvable} description la description du thème
   * @returns {Theme} ce thème
   */
  setDescription(description) {
    var desc = resolveString(description);
    this.description = desc;
    return this;
  }

  /**
   * Ajoute un rôle à ce thème
   * @param {Role} role le rôle à ajouter
   * @returns {Theme} ce thème
   */
  addRole(role) {
    this.roles.push(role);
    return this;
  }

  /**
   * Prépare un thème avec un preset
   * @param {StringResolvable} preset le nom du preset
   * @returns {Theme} ce thème
   */
  preset(preset) {
    preset = resolveString(preset);
    var theme = Presets[preset];
    this.roles = [];
    this.setName(preset);
    this.setDescription(theme.description);
    theme.roles.forEach(role => {
      var actualrole = new Role()
        .setHelp(role)
        .setName(role.Name)
        .setTitle(role.Title)
        .setEmote(role.Emote)
        .setId(role.Id.split(","))
        .setNuit(role.Nuit);

      this.addRole(actualrole);
    });

    return this;
  }
}

function resolveString(data) {
  if (typeof data === "string") return data;
  if (data instanceof Array) return data.join("\n");
  return String(data);
}

module.exports = Theme;
