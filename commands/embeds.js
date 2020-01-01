const Discord = require("discord.js");

class Embeds {
  constructor() {
    this.helpAdmin1 = new Discord.RichEmbed()
      .setTitle("Commandes d'administration")
      .setDescription(
        "Liste des commandes d'administration. Seuls les administrateurs peuvent les utiliser."
      )
      .addField(
        "► ``defadminhere @membre``",
        "Permet au membre mentionné d'utiliser les commandes de jeu et d'administration sur ce serveur. (Cela ne lui donne aucune permission en dehors de celles du bot)"
      )
      .addField(
        "► ``supadminhere @membre``",
        "Enlève la permission au membre mentionné d'utiliser les commandes de jeu et d'administration sur ce serveur. (Cela ne lui enlève aucune permission en dehors de celles du bot)"
      )
      .addField(
        "► ``clear X``",
        "Supprime les X messages au dessus de la commande."
      )
      .setColor("OxFF0000")
      .setFooter("◀️ : Revenir au menu");

    this.helpGameGen = new Discord.RichEmbed()
      .setTitle("Commande de jeu")
      .setDescription(
        "Liste des commandes du jeu. Seuls les administrateurs peuvent les utiliser."
      )
      .addField("1️⃣ :", "Voir les commandes pour débuter une partie")
      .addField("2️⃣", "Voir les commandes en cours de partie")
      .addField("3️⃣", "Voir les commandes de fin de partie")
      .setColor("OxFF0000")
      .setFooter("◀️ : Revenir au menu.");

    this.helpGame1 = new Discord.RichEmbed()
      .setTitle("Commandes de début de jeu")
      .setDescription("Liste des commandes pour débuter une partie.")
      .addField(
        "► ``inscription X``",
        "Crée un message d'inscription limité à X inscriptions."
      )
      .addField(
        "► ``compo``",
        "Active l'assistant de création de composition. Il suffit ensuite de suivre les instructions. (Pour plus de confort, il est recommandé d'effectuer cette commande sur un salon caché) \n **Attention :** Cette commande arrête les inscriptions, elle est donc à utiliser une fois tous les joueurs inscrits."
      )
      .addField(
        "► ``distribution``",
        "Commande à effectuer une fois la composition terminée. Elle distribue aléatoirement chaque rôle aux joueurs inscrits et donne la liste dans le salon des logs."
      )
      .addField(
        "► ``nuit``",
        "Déclenche la nuit, mute les joueurs présents en vocal et affiche l'assistant de la nuit, permettant d'appeler les rôles actifs de nuit."
      )
      .setColor("OxF0000")
      .setFooter(
        "◀️ : Revenir au menu précédent. 2️⃣ : Voir l'aide pour les commandes en jeu. 3️⃣ Voir l'aide pour les commandes de fin de partie."
      );

    this.helpGame2 = new Discord.RichEmbed()
      .setTitle("Commandes en cours de jeu")
      .setDescription("Liste des commandes à effectuer en cours de partie.")
      .addField(
        "► ``daystart X``",
        "Débute la journée de débat, permettant aux joueurs de débattre. La journée dure X minutes, 5 par défaut."
      )
      .addField(
        "► ``vote jour``",
        "Crée un vote entre tous les joueurs encore vivants."
      )
      .addField(
        "► ``kill @membre``",
        "Tue le joueur mentionné, révélant son rôle dans le salon général."
      )
      .addField(
        "► ``prolong X``",
        "En cas d'égalité, prolonge la durée de la journée de X minutes, 1 minute 30 par défaut."
      )
      .addField("► ``dayend``", "Achève prématurément la journée.")
      .setFooter(
        "◀️ : Revenir au menu précédent. 1️⃣ : Voir l'aide pour les commandes de début de partie. 3️⃣ : Voir l'aide pour les commandes de fin de partie. ⚠️ : Roir les commandes inhabituelles."
      );

    this.helpGame2Chelou = new Discord.RichEmbed()
      .setTitle("Commandes inhabituelles")
      .setDescription(
        "Attention : Ces commandes peuvent être source de problèmes, et ne devraient pas avoir à être utiliser dans une situation normale."
      )
      .addField(
        "► ``revive @membre``",
        "Ressuscite le joueur mentionné. Fortement déconseillé en cours de partie car il n'aura plus son rôle."
      )
      .addField(
        "► ``reviveall``",
        "Ressuscite tous les joueurs. En théorie inutile, mêmes inconvénients qu'au dessus."
      )
      .addField(
        "► ``charme @membre``",
        "Charme manuellement le joueur mentionné. En théorie inutile."
      )
      .addField(
        "► ``decharme @membre``",
        "Retire le charme manuellement sur le joueur mentionné. En théorie inutile."
      )
      .setFooter(
        "◀️ : revenir à l'aide concernant les commandes en cours de partie."
      );

    this.helpGame3 = new Discord.RichEmbed()
      .setTitle("Commandes de fin de jeu")
      .setDescription("Liste des commandes de fin de jeu")
      .addField(
        "► ``win [village, loup-garou, joueur de flûte, amoureux]``",
        "Attribue la victoire à un camp."
      )
      .addField(
        "► ``gamend``",
        "Termine la partie, réinitialisant les rôles et affichant le résumé si la victoire a été attribuée."
      )
      .addField(
        " ``allend``",
        "Termine la session, retire les rôles de joueur et déplace tout le monde dans le salon vocal général."
      )
      .setFooter(
        "◀️ : Revenir au menu précédent. 1️⃣ : : Voir l'aide pour les commandes de début departie. 2️⃣ Voir l'aide pour les commandes de jeu."
      );

    this.helpTools = new Discord.RichEmbed()
      .setTitle("Commandes de configuration")
      .setDescription("Liste des commandes de configuration")
      .addField("Aide et commandes non implémentées", "Mais bientôt.")
      .setFooter("◀️ : Revenir au menu.");

    this.embedLG = new Discord.RichEmbed()
      .setTitle("Le Loup-Garou")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=2&name=Loup-Garou)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte2.png"
      )
      .setColor("#FF0000")
      .addField(
        "Son but",
        "Dévorer tous les innocents, ceux qui ne sont pas Loup-Garou."
      )
      .addField(
        "Pouvoir",
        "Chaque nuit, il se réunit avec les autres Loup-Garou dans un salon privé pour dévorer un joueur."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les innocents sont morts, il obtient une victoire de Loup-Garou."
      );

    this.embedSV = new Discord.RichEmbed()
      .setTitle("Le Simple Villageois [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=1&name=Simple%20Villageois)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte1.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField("Pouvoir", "Aucun.");

    this.embedSoso = new Discord.RichEmbed()
      .setTitle("La Sorcière [Innocente]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=5&name=Sorci%C3%A8re  )"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte5.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Elle dispose de deux potions à usage unique : 1 potion de vie, pour sauver la victime[message.guild.id] des Loups-Garous la nuit, et 1 potion de mort, pour tuer un joueur, sans qu'il puisse être sauvé"
      );

    this.embedSalva = new Discord.RichEmbed()
      .setTitle("Le Salvateur [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=4&name=Salvateur)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte4.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Chaque nuit, il peut protéger un joueur de l'attaque des Loups-Garous. Si ce joueur est désigné par les Loups-Garous, il ne mourra pas. Il peut se protéger lui-même, mais pas deux nuits de suite la même personne."
      );

    this.embedChass = new Discord.RichEmbed()
      .setTitle("Le Chasseur [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=6&name=Chasseur)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte6.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "A sa mort, il dispose d'un dernier souffle pour tuer la personne de son choix."
      );

    this.embedCupi = new Discord.RichEmbed()
      .setTitle("Le Cupidon [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=7&name=Cupidon)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte7.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Au début de la partie, il doit désigner deux joueurs qui seront dès lors amoureux : Si l'un des deux vient à mourir, l'autre se suicide de tristesse dans la foulée."
      );

    this.embedVovo = new Discord.RichEmbed()
      .setTitle("La Voyante [Innocente]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=3&name=Voyante)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte3.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Chaque nuit, elle peut désigner un joueur dont elle verra le rôle."
      );

    this.embedAncien = new Discord.RichEmbed()
      .setTitle("L'Ancien [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=8&name=Ancien)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte8.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Il survit à la première attaque des Loups-Garous, mais s'il est pendu par le village, tous les innocents perdent leurs pouvoirs"
      );

    this.embedIDV = new Discord.RichEmbed()
      .setTitle("L'Idiot Du Village [Innocent]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=13&name=Idiot%20du%20Village)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte13.png"
      )
      .setColor("#FFFFFF")
      .addField(
        "Son but",
        "Déterminer qui sont les **Loups-Garous** et les éliminer."
      )
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque tous les Loups-Garous sont morts, il obtient une victoire du Village."
      )
      .addField(
        "Pouvoir",
        "Si le village tente de pendre l'Idiot, il se retient au dernier instant, devant sa bêtise. L'Idiot du village est gracié, mais en échange, il ne peut plus voter."
      );

    this.embedJDF = new Discord.RichEmbed()
      .setTitle("Le Joueur De Flûte [Solitaire]")
      .setDescription(
        "[Fiche du site](https://www.loups-garous-en-ligne.com/?carte=15&name=Joueur%20de%20Fl%C3%BBte)"
      )
      .setThumbnail(
        "https://www.loups-garous-en-ligne.com/jeu/assets/images/carte15.png"
      )
      .setColor("#8B008B")
      .addField("Son but", "Charmer tous les habitants du village.")
      .addField(
        "Quand gagne-t-il ?",
        "Lorsque l'intégralité des joueurs vivants est charmée, il remporte une victoire de Flûtiste."
      )
      .addField(
        "Pouvoir",
        "Chaque nuit, il peut charmer jusqu'à 2 joueurs. Ces joueurs sont informés de leurs enchantement, et savent qui sont les autres personnes charmées. Le charme n'a aucun impact sur les personnages ou la façon de jouer."
      );
  }
}

module.exports = Embeds;
