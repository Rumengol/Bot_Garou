const datas = require("../../global.js");

var methods = {
    setTheme = function(theme, message){
        theme.roles.forEach(role => {
            if (role.nuit) {
                datas.rolesDeNuit[message.guild.id].push(role.name);
            }
            datas.listeRoles[message.guild.id].push(role.name)
            switch (role.title) {
              case "Loup-Garou":
                datas.LG[message.guild.id] = role.name;
                datas.IDlg[message.guild.id] = role.ID;
                datas.emoteLG[message.guild.id] = role.emote;
                break;
              case "Simple Villageois":
                datas.datas.SV[message.guild.id] = role.name
                datas.IDsv[message.guild.id] = role.ID;
                datas.emoteSV[message.guild.id] = role.emote;
                break;
              case "Cupidon":
                datas.Cupi[message.guild.id] = role.name
                datas.IDcupi[message.guild.id] = role.ID;
                datas.emoteCupi[message.guild.id] = role.emote;
                break;
              case "Salvateur":
                datas.Salva[message.guild.id] = role.name
                datas.IDsalva[message.guild.id] = role.ID;
                datas.emoteSalva[message.guild.id] = role.emote;
                break;
              case "Chasseur":
                datas.Chassou[message.guild.id] = role.name
                datas.IDchassou[message.guild.id] = role.ID;
                datas.emoteChassou[message.guild.id] = role.emote;
                break;
              case "Sorcière":
                datas.Soso[message.guild.id] = role.name
                datas.IDsoso[message.guild.id] = role.ID;
                datas.emoteSoso[message.guild.id] = role.emote;
                break;
              case "Voyante":
                datas.Vovo[message.guild.id] = role.name
                datas.IDvovo[message.guild.id] = role.ID;
                datas.emoteVovo[message.guild.id] = role.emote;
                break;
              case "Idiot Du Village":
                datas.IDV[message.guild.id] = role.name;
                datas.IDidv[message.guild.id] = role.ID;
                datas.emoteIDV[message.guild.id] = role.emote;
                break;
              case "Joueur De Flûte":
                datas.JDF[message.guild.id] = role.name
                datas.IDjdf[message.guild.id] = role.ID;
                datas.emoteJDF[message.guild.id] = role.emote;
                break;
              case "Ancien":
                datas.Ancien[message.guild.id] = role.name
                datas.IDancien[message.guild.id] = role.ID;
                datas.emoteAncien[message.guild.id] = role.emote;
                break;
              case "Bouc émissaire":
                datas.BE[message.guild.id] = role.name
                datas.IDbe[message.guild.id] = role.ID;
                datas.emoteBE[message.guild.id] = role.emote;
                break;
              case "Petite Fille":
                datas.PF[message.guild.id] = role.name;
                datas.IDpf[message.guild.id] = role.ID;
                datas.emotePF[message.guild.id] = role.emote;
                break;
        
              default:
                throw new ReferenceError("Erreur dans le titre du rôle.");
                break;
            }
          });
    }
};

module.exports = methods;