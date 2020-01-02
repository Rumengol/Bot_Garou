const RichEmbed = require("discord.js").RichEmbed;

class Role {
  constructor(data = {}) {
    /**
     * Equivalent classique du rôle
     * @type {string}
     */
    this.title = data.title;

    /**
     * Nom du rôle
     * @type {string}
     */
    this.name = data.name;

    /**
     * Embed d'aide du rôle
     * @type {RichEmbed}
     */
    this.embed = data.embed;

    /**
     * ID possibles du rôle
     * @type {string[]}
     */
    this.ID = data.ID;

    /**
     * Emote représentant le rôle
     * @type {string}
     */
    this.emote = data.emote;

    /**
     * Si le rôle agit la nuit ou non
     * @type {bool}
     */
    this.nuit = data.nuit;
  }

  /**
   * Set le nom du rôle
   * @param {StringResolvable} name le nom
   * @returns {Role} ce rôle
   */
  setName(name) {
    name = resolveString(name);
    if (name.length > 50)
      throw new RangeError(
        "Un nom de rôle ne peut pas faire plus de 50 caractères."
      );
    this.name = name;
    return this;
  }

  /**
   * Set l'équivalent classique du rôle
   * @param {StringResolvable} title l'équivalent
   * @returns {Role} ce rôle
   */
  setTitle(title) {
    title = resolveString(title);
    this.title = title;
    return this;
  }

  /**
   * Set l'embed d'aide du rôle
   * @param {Object} data le résultat du JSON.parse() correspondant au rôle
   * @returns {Role} ce rôle
   */
  setHelp(data) {
    var title = resolveString(data.Title);
    var goal = resolveString(data.Goal);
    var power = resolveString(data.Power);
    var win = resolveString(data.Win);
    var color = resolveString(data.Color);
    var desc = resolveString(data.Description);
    var thumbnail = resolveString(data.Thumbnail);

    this.embed = new RichEmbed()
      .setTitle(title)
      .setDescription(desc)
      .setThumbnail(thumbnail)
      .setColor(color)
      .addField("Son but", goal)
      .addField("Quand gagne-t-il ?", win)
      .addField("Pouvoir", power);

    return this;
  }

  /**
   * Set les IDs possibles pour le rôle, en plus de celles de base
   * @param {StringResolvable[]} ids l'array des IDs possibles
   * @returns {Role} ce rôle
   */
  setId(ids) {
    this.ID = [];
    ids.forEach(id => {
      this.ID.push(resolveString(id));
    });

    return this;
  }

  /**
   * Set l'emote associée au rôle
   * @param {StringResolvable} emote l'emote
   * @returns {Role} ce rôle
   */
  setEmote(emote) {
    emote = resolveString(emote);
    this.emote = emote;

    return this;
  }

  /**
   * Set l'activité nocturne du rôle
   * @param {bool} nuit nocturne ou non
   * @returns {Role} ce rôle
   */
  setNuit(nuit) {
    this.nuit = nuit;

    return this;
  }
}

function resolveString(data) {
  if (typeof data === "string") return data;
  if (data instanceof Array) return data.join("\n");
  return String(data);
}

module.exports = Role;
