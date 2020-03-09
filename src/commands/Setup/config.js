const low = require("lowdb")
const adapter = new FileSync("adminrole.json")
const db = low(adapter)
const identifiers = require("../../identifiers.json")
const shared = require("../Shared")

exports.run = (client, message, args) => {
    if (args[1] == "auto") {
        var guild = message.guild;
        if (db.get("roles").map("guild").value().toString().includes(guild.id) || db.get("salons").map("guild").value().toString().includes(guild.id)) {
            message.reply("Attention, au moins un élément est configuré sur ce serveur. Veuillez le(s) retirer afin d'activer la configuration automatique.")
        } else {
            message.channel.send(
                "Configuration automatique du serveur en cours, veuillez patienter..."
            );
            guild
                .createRole({
                    name: "Joueurs Vivants",
                    color: "DARK_GREEN",
                    mentionable: "true"
                })
                .then(roleJV => {

                    db.get("roles")
                        .push({
                            guild: guild.id,
                            id: "vivants",
                            story_value: roleJV.id
                        })
                        .write();
                    message.channel.send(`Le rôle ${roleJV} a été créé...`);

                    guild
                        .createRole({
                            name: "Joueurs Morts",
                            color: "DARK_PURPLE",
                            mentionable: "true",
                            position: roleJV.position - 1
                        })
                        .then(roleJM => {
                            db.get("roles")
                                .push({
                                    guild: guild.id,
                                    id: "morts",
                                    story_value: roleJM.id
                                })
                                .write();
                            message.channel.send(`Le rôle ${roleJM} a été créé...`);

                            var game = guild.createChannel("Jeu Loup Garou", {
                                type: "category",
                                position: 0
                            }).then(game => {
                                message.channel.send(`La catégorie **${game.name}** a été créée...`);

                                var village = guild.createChannel("place-du-village", {
                                    type: "text",
                                    topic: "Débattez ici la journée.",
                                    position: 1,
                                    permissionOverwrites: [
                                        {
                                            id: guild.id,
                                            deny: ["VIEW_CHANNEL"]
                                        },
                                        {
                                            id: roleJV.id,
                                            deny: ["SEND_MESSAGES"],
                                            allow: ["VIEW_CHANNEL"]
                                        },
                                        {
                                            id: roleJM.id,
                                            deny: ["SEND_MESSAGES"],
                                            allow: ["VIEW_CHANNEL"]
                                        }
                                    ]
                                }).then(channel => {
                                    db.get("salons")
                                        .push({
                                            guild: guild.id,
                                            id: "village",
                                            story_value: channel.id
                                        })
                                        .write();
                                    channel.setParent(game.id)
                                    message.channel.send(`Le salon ${channel} a été créé...`)

                                    var vote = guild.createChannel("votes", {
                                        type: "text",
                                        topic: "Votez ici pour savoir qui aura l'honneur d'être accroché au grand arbre.",
                                        position: 2,
                                        permissionOverwrites: [
                                            {
                                                id: guild.id,
                                                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                            },
                                            {
                                                id: roleJV.id,
                                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                                            },
                                            {
                                                id: roleJM.id,
                                                deny: ["SEND_MESSAGES"],
                                                allow: ["VIEW_CHANNEL"]
                                            }
                                        ]
                                    }).then(channel => {
                                        db.get("salons")
                                            .push({
                                                guild: guild.id,
                                                id: "votes",
                                                story_value: channel.id
                                            })
                                            .write();
                                        channel.setParent(game.id)
                                        message.channel.send(`Le salon ${channel} a été créé...`)

                                        var cimetiere = guild.createChannel("cimetière", {
                                            type: "text",
                                            topic: "Lieu de villégiature des morts, qui observent les tracas des vivants.",
                                            position: 5,
                                            permissionOverwrites: [
                                                {
                                                    id: guild.id,
                                                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                                },
                                                {
                                                    id: roleJM.id,
                                                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                                }
                                            ]
                                        }).then(channel => {
                                            db.get("salons")
                                                .push({
                                                    guild: guild.id,
                                                    id: "cimetiere",
                                                    story_value: channel.id
                                                })
                                                .write();
                                            channel.setParent(game.id)
                                            message.channel.send(`Le salon ${channel} a été créé...`)

                                            var taniere = guild.createChannel("tanière-des-loups", {
                                                type: "text",
                                                topic: "Le repaire des lycanthropes lorsque tombe la nuit.",
                                                position: 3,
                                                permissionOverwrites: [
                                                    {
                                                        id: guild.id,
                                                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                                    }
                                                ]
                                            }).then(channel => {
                                                db.get("salons")
                                                    .push({
                                                        guild: guild.id,
                                                        id: "loups",
                                                        story_value: channel.id
                                                    })
                                                    .write();
                                                channel.setParent(game.id)
                                                message.channel.send(`Le salon ${channel} a été créé...`)

                                                var audience = guild.createChannel("audience", {
                                                    type: "text",
                                                    topic: "Une flûte enjôleuse, un public apathique, chaque nuit plus important.",
                                                    position: 1,
                                                    permissionOverwrites: [
                                                        {
                                                            id: guild.id,
                                                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                                        }
                                                    ]
                                                }).then(channel => {
                                                    db.get("salons")
                                                        .push({
                                                            guild: guild.id,
                                                            id: "charmed",
                                                            story_value: channel.id
                                                        })
                                                        .write();
                                                    channel.setParent(game.id)
                                                    message.channel.send(`Le salon ${channel} a été créé...`)
                                                    var logs = guild.createChannel("logs-bot-garou", {
                                                        type: "text",
                                                        topic: "Un salon pour le maître du jeu, qu'il puisse recueillir toutes les informations relatives à la partie.",
                                                        position: 0,
                                                        permissionOverwrites: [
                                                            {
                                                                id: guild.id,
                                                                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                                            }
                                                        ]
                                                    }).then(channel => {
                                                        db.get("salons")
                                                            .push({
                                                                guild: guild.id,
                                                                id: "logs",
                                                                story_value: channel.id
                                                            })
                                                            .write();
                                                        channel.setParent(game.id)
                                                        message.channel.send(`Le salon ${channel} a été créé...`)
                                                        var general = guild.createChannel("Vocal général", {
                                                            type: "voice",
                                                            position: 1
                                                        }).then(channel => {
                                                            db.get("salons")
                                                                .push({
                                                                    guild: guild.id,
                                                                    id: "general",
                                                                    story_value: channel.id
                                                                })
                                                                .write();
                                                            channel.setParent(game.id)
                                                            message.channel.send(`Le salon vocal **${channel.name}** a été créé...`)
                                                            var vocal = guild.createChannel("Place Du Village", {
                                                                type: "voice",
                                                                position: 2,
                                                                permissionOverwrites: [
                                                                    {
                                                                        id: guild.id,
                                                                        deny: ["CONNECT", "SPEAK"]
                                                                    },
                                                                    {
                                                                        id: roleJV.id,
                                                                        allow: ["SPEAK", "CONNECT"]
                                                                    },
                                                                    {
                                                                        id: roleJM.id,
                                                                        deny: ["SPEAK"],
                                                                        allow: ["CONNECT"]
                                                                    }
                                                                ]
                                                            }).then(channel => {
                                                                db.get("salons")
                                                                    .push({
                                                                        guild: guild.id,
                                                                        id: "vocal",
                                                                        story_value: channel.id
                                                                    })
                                                                    .write();
                                                                channel.setParent(game.id)
                                                                message.channel.send(`Le salon vocal **${channel.name}** a été créé...`).then(() =>
                                                                    message.channel.send("Tous les salons et les rôles ont étés créés. Vous pouvez librement les renommer, modifier et déplacer, mais faites attention à ne pas les supprimer par inadvertance, auquel cas je risquerais de dysfonctionner."))
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                });
        }
    } else {
        message.reply(
            "Quelle type de configuration souhaitez-vous ? Actuellement, seule ``/config auto`` est disponible."
        );
    }
}