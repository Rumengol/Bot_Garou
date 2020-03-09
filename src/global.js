exports.run = () => {
    var admin = {};
    var mini = {};
    var gameOn = {};
    var messCompo = {};
    var compoDone = {};
    var inscrEmbed = {};

    var maxP = {};
    var inscr = {};

    var nbRole = {};
    var inscrits = {};
    var inscrep = {};
    //{GuildMember,Role,User,Victoire}
    var distribRoles = {};
    var distribRolMorts = {};
    var charmes = {};
    var votes = {};
    var avote = {};
    //{user,votes,contenu}
    var voted = {};
    var joueursLG = {};
    var Listvivants = {};
    var vivants = {};
    var win = {};
    var embedRecap = {};

    var distribution = {};
    //Représente l'état de la partie, avec nuit ou jour en première clef, le nombre en deuxième
    var StateOfTheGame = {}

    var listeRoles = {}

    let theme = {};

    let IDlg = {}
    let LG = {}
    let emoteLG = {}
    let IDcupi = {}
    let Cupi = {}
    let emoteCupi = {}
    let IDsoso = {}
    let Soso = {}
    let emoteSoso = {};
    let IDvovo = {}
    let Vovo = {}
    let emoteVovo = {}
    let IDchassou = {}
    let Chassou = {}
    let emoteChassou = {}
    let IDidv = {}
    let IDV = {}
    let emoteIDV = {}
    let Ancien = {}
    let emoteAncien = {}
    let IDancien = {}
    let IDjdf = {}
    let JDF = {}
    let emoteJDF = {}
    let IDsalva = {}
    let Salva = {}
    let emoteSalva = {}
    let IDsv = {}
    let SV = {}
    let emoteSV = {}
    let BE = {}
    let IDbe = {}
    let emoteBE = {}
    let PF = {}
    let IDpf = {}
    let emotePF = {}

    var rolesDeNuit = {};
    var potVie = {};
    var potMort = {};
    var Lovers = {};

    //{Name,Quantite,Emote}
    var compo = {};

    var banniDeVote = {};
    let IDVcache = {};
    var jourBE = {};

    //Cupidon messages
    let eux = {};
    var ConfCupi = {};

    //Sorcière messages
    var ConfSoso = {};
    var victime = {};
    var next = {};
    var salonLog = {};
    var guildId = {};

    var votedejour = {};

    var roleDB = {};
    var lieuDB = {};
    var x = {};
    var y = {};
    var z = {};
    var pouet = {};

    function init(id) {
        mini[id] = false;
        gameOn[id] = false;
        compoDone[id] = false;
        nbRole[id] = 0;
        inscrits[id] = [];
        inscrep[id] = [];
        distribRoles[id] = [];
        distribRolMorts[id] = [];
        charmes[id] = [];
        votes[id] = [];
        avote[id] = [];
        voted[id] = [];
        joueursLG[id] = [];
        vivants[id] = "";
        win[id] = null;

        distribution[id] = [];
        StateOfTheGame[id] = ["", 0];

        theme[id] = "classique";
        rolesDeNuit[id] = [];
        potVie[id] = true;
        potMort[id] = true;
        Lovers[id] = [];
        compo[id] = [];

        listeRoles[id] = [];

        IDlg[id] = []
        LG[id] = ""
        emoteLG[id] = ""
        IDcupi[id] = []
        Cupi[id] = ""
        emoteCupi[id] = ""
        IDsoso[id] = []
        Soso[id] = ""
        emoteSoso[id] = ""
        IDvovo[id] = []
        Vovo[id] = ""
        emoteVovo[id] = ""
        IDchassou[id] = []
        Chassou[id] = ""
        emoteChassou[id] = ""
        IDidv[id] = []
        IDV[id] = ""
        emoteIDV[id] = ""
        Ancien[id] = ""
        emoteAncien[id] = ""
        IDancien[id] = []
        IDjdf[id] = []
        JDF[id] = ""
        emoteJDF[id] = ""
        IDsalva[id] = []
        Salva[id] = ""
        emoteSalva[id] = []
        IDsv[id] = []
        SV[id] = ""
        emoteSV[id] = ""
        BE[id] = ""
        IDbe[id] = []
        emoteBE[id] = ""
        PF[id] = ""
        IDpf[id] = []
        emotePF[id] = ""

        banniDeVote[id] = [];
        IDVcache[id] = true;
        jourBE[id] = false;
        //Cupidon messages
        eux[id] = [];

        //Sorcière messages
        victime[id] = "";
        next[id] = false;
        guildId[id] = id;

        votedejour[id] = false;
    }
}