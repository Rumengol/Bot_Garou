const dbutils = require("./Utils/dbUtils.js");

var datas = {
  admin: {},
  mini: {},
  gameOn: {},
  messCompo: {},
  compoDone: {},
  inscrEmbed: {},

  maxP: {},
  inscr: {},

  nbRole: {},
  inscrits: {},
  inscrep: {},
  //{GuildMember,Role;User,Victoire},
  distribRoles: {},
  distribRolMorts: {},
  charmes: {},
  votes: {},
  avote: {},
  //{user,votes,contenu},
  voted: {},
  joueursLG: {},
  Listvivants: {},
  vivants: {},
  win: {},
  embedRecap: {},

  distribution: {},
  //Représente l'état de la partie; avec nuit ou jour en première clef, le nombre en deuxième
  StateOfTheGame: {},

  listeRoles: {},

  theme: {},

  IDlg: {},
  LG: {},
  emoteLG: {},
  IDcupi: {},
  Cupi: {},
  emoteCupi: {},
  IDsoso: {},
  Soso: {},
  emoteSoso: {},
  IDvovo: {},
  Vovo: {},
  emoteVovo: {},
  IDchassou: {},
  Chassou: {},
  emoteChassou: {},
  IDidv: {},
  IDV: {},
  emoteIDV: {},
  Ancien: {},
  emoteAncien: {},
  IDancien: {},
  IDjdf: {},
  JDF: {},
  emoteJDF: {},
  IDsalva: {},
  Salva: {},
  emoteSalva: {},
  IDsv: {},
  SV: {},
  emoteSV: {},
  BE: {},
  IDbe: {},
  emoteBE: {},
  PF: {},
  IDpf: {},
  emotePF: {},

  rolesDeNuit: {},
  potVie: {},
  potMort: {},
  Lovers: {},

  //{Name;Quantite;Emote},
  compo: {},

  banniDeVote: {},
  IDVcache: {},
  jourBE: {},

  //Cupidon messages
  eux: {},
  ConfCupi: {},

  //Sorcière messages
  ConfSoso: {},
  victime: {},
  next: {},
  salonLog: {},
  guildId: {},

  votedejour: {},

  roleDB: {},
  lieuDB: {},
  x: {},
  y: {},
  z: {},
  pouet: {},

  init: function(id) {
    datas.mini[id] = false;
    datas.gameOn[id] = false;
    datas.compoDone[id] = false;
    datas.nbRole[id] = 0;
    datas.inscrits[id] = [];
    datas.inscrep[id] = [];
    datas.distribRoles[id] = [];
    datas.distribRolMorts[id] = [];
    datas.charmes[id] = [];
    datas.votes[id] = [];
    datas.avote[id] = [];
    datas.voted[id] = [];
    datas.joueursLG[id] = [];
    datas.vivants[id] = "";
    datas.win[id] = null;

    datas.distribution[id] = [];
    datas.StateOfTheGame[id] = ["", 0];

    datas.theme[id] = "classique";
    datas.rolesDeNuit[id] = [];
    datas.potVie[id] = true;
    datas.potMort[id] = true;
    datas.Lovers[id] = [];
    datas.compo[id] = [];

    datas.listeRoles[id] = [];

    datas.IDlg[id] = [];
    datas.LG[id] = "";
    datas.emoteLG[id] = "";
    datas.IDcupi[id] = [];
    datas.Cupi[id] = "";
    datas.emoteCupi[id] = "";
    datas.IDsoso[id] = [];
    datas.Soso[id] = "";
    datas.emoteSoso[id] = "";
    datas.IDvovo[id] = [];
    datas.Vovo[id] = "";
    datas.emoteVovo[id] = "";
    datas.IDchassou[id] = [];
    datas.Chassou[id] = "";
    datas.emoteChassou[id] = "";
    datas.IDidv[id] = [];
    datas.IDV[id] = "";
    datas.emoteIDV[id] = "";
    datas.Ancien[id] = "";
    datas.emoteAncien[id] = "";
    datas.IDancien[id] = [];
    datas.IDjdf[id] = [];
    datas.JDF[id] = "";
    datas.emoteJDF[id] = "";
    datas.IDsalva[id] = [];
    datas.Salva[id] = "";
    datas.emoteSalva[id] = [];
    datas.IDsv[id] = [];
    datas.SV[id] = "";
    datas.emoteSV[id] = "";
    datas.BE[id] = "";
    datas.IDbe[id] = [];
    datas.emoteBE[id] = "";
    datas.PF[id] = "";
    datas.IDpf[id] = [];
    datas.emotePF[id] = "";

    datas.banniDeVote[id] = [];
    datas.IDVcache[id] = true;
    datas.jourBE[id] = false;
    datas.eux[id] = []; //Cupidon messages

    //Sorcière messages
    (datas.victime[id] = ""), (datas.next[id] = false);
    datas.guildId[id] = id;

    datas.votedejour[id] = false;
  },
  adminlist: dbutils
    .getAllValuesInDb("db", "administrateurs", "story_value")
    .toString(),

  Auth: function(message) {
    datas.mini[message.guild.id] = require("./auth.js")(message);
  }
};

module.exports = datas;
