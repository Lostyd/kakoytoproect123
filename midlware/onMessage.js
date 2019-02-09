var nconf = require('../config');
var schems = require('../db/schems');
var disuser = schems.disuser;
var {Client, RichEmbed, Attachment} = require('discord.js');

function getRandomInt(min, max, skew) {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

/*:one:
:two:
:three:
:four:
:five:
:six:
:seven:*/


exports.commands = function (msg, client) {
    var exp = getRandomInt(nconf.get('minExp'), nconf.get('maxExp'), 1) + (msg.content.length * 0.5);
    exp = exp.toFixed(0);
    if (msg.channel.type !== 'dm') {
        if (msg.content !== '()rank') {
            disuser.findOne({userid: msg.author.id}, function (err, rows) {
                if (rows !== null) {
                    if ((Date.now() - Number(rows.messagedate)) >= nconf.get('cdExp')) {
                        disuser.findOneAndUpdate({userid: msg.author.id}, {
                            $inc: {exp: exp},
                            messagedate: Date.now()
                        }, function () {
                            disuser.findOne({userid: msg.author.id}, function (err, rows) {
                                /*  if(nconf.get(`${rows.lvl + 1}`) !== undefined){
                                   msg.member.addRole(nconf.get(`${rows.lvl}`))
                                  }*/
                                if (Number(rows.exp) >= (nconf.get('startExp') * Math.pow(2, Number(rows.lvl) - 1))) {
                                    if (nconf.get(`${rows.lvl + 1}`) !== undefined) {
                                        msg.member.addRole(nconf.get(`${rows.lvl + 1}`));
                                        var embed = new RichEmbed()
                                            .setTitle('Выбери гильдию')
                                            .setDescription('<:123:541142425880494080> - Священное Око\n' +
                                                            '<:286:540608887683022879> - грозные Псы\n' +
                                                            '<:566:541142369987461121> - Покорители Астрала\n' +
                                                            '<:fillBlock:540818876410363918> - Братство Сумеречного Леса\n' +
                                                            '<:block:540818876196323328> - Мертвые Души');

                                        msg.guild.members.get(msg.author.id).send(embed)
                                            .then(function (msg) {
                                            msg.react('541142425880494080');
                                                setTimeout(function () {
                                                msg.react('540608887683022879');
                                                    setTimeout(function () {
                                                        msg.react('541142369987461121');
                                                        setTimeout(function () {
                                                            msg.react('540818876410363918');
                                                            setTimeout(function () {
                                                                msg.react('540818876196323328')
                                                            },1000)
                                                        },1000);
                                                    },1000);
                                                },1000);
                                            })
                                    }

                                    disuser.findOneAndUpdate({userid: msg.author.id}, {$inc: {lvl: 1}}, function () {
                                        dsbot.guilds.get('540105720071323649').channels.get(nconf.get('channel')).send(`<@${msg.author.id}> Поздарвляю ты получили ` + (Number(rows.lvl) + 1) + ' уровень')
                                    })
                                }
                            })

                        })
                    }
                }

            });
        }
    }

    function setBar(a) {
        var b = nconf.get('block');
        var fb = nconf.get('fillBlock');
        if (a > 0 && a < 7) {
            return b+b+b+b+b+b+b+b+b+b+b+b+b+b
        }
        if (a > 6 && a < 14) {
            return fb+b+b+b+b+b+b+b+b+b+b+b+b+b
        }
        if (a > 13 && a < 21) {
            return fb+fb+b+b+b+b+b+b+b+b+b+b+b+b
        }
        if (a > 20 && a < 28) {
            return fb+fb+fb+b+b+b+b+b+b+b+b+b+b+b
        }
        if (a > 27 && a < 35) {
            return fb+fb+fb+fb+b+b+b+b+b+b+b+b+b+b
        }
        if (a > 34 && a < 42) {
            return fb+fb+fb+fb+fb+b+b+b+b+b+b+b+b+b
        }
        if (a > 41 && a < 49) {
            return fb+fb+fb+fb+fb+fb+b+b+b+b+b+b+b+b
        }
        if (a > 48 && a < 56) {
            return fb+fb+fb+fb+fb+fb+fb+b+b+b+b+b+b+b
        }
        if (a > 55 && a < 63) {
            return fb+fb+fb+fb+fb+fb+fb+fb+b+b+b+b+b+b
        }
        if (a > 62 && a < 70) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+b+b+b+b+b
        }
        if (a > 69 && a < 77) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+b+b+b+b
        }
        if (a > 76 && a < 84) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+b+b+b
        }
        if (a > 83 && a < 91) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+b+b
        }
        if (a > 90 && a < 100) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+b
        }
        if (a > 99) {
            return fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb+fb
        }
    }

    if (msg.content === '()rank') {
        var title;
        disuser.findOne({userid: msg.author.id}, function (err, rows) {
            var a = (Number(rows.exp) / (nconf.get('startExp') * Math.pow(2, Number(rows.lvl) - 1)) * 100);
            var embed = new RichEmbed()
                .setTitle(`rank: ${rows.lvl}ᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠexp: ${rows.exp}/${(nconf.get('startExp') * Math.pow(2, Number(rows.lvl) - 1))}`)
                .setAuthor(msg.author.username, msg.author.avatarURL)
                //  .setURL("https://discordapp.com/")

                /*

                 * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                 *//*пустой символ: "ᅠ"*/
                .setColor(0x00AE86)
                .setDescription(setBar(a))
            //.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")                     //|
            //.setImage("http://i.imgur.com/yVpymuV.png")                                                                            //|
            .setThumbnail("http://i.imgur.com/p2qNFag.png");                                                                        //|
            /*                                                                                                                       //|
             * Takes a Date object, defaults to current date.                                                                        //|
             */                                                                                                                      //|
            /* .setTimestamp()*/                                                                                                      //|
            //.addField("guildlvlᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠexp: ${rows.exp}/${(nconf.get('startExp') * Math.pow(2, Number(rows.lvl) - 1)}\n█████===================================⦘", "ᅠ");
            /*
             * Inline fields may not display as inline if the thumbnail and/or image is too big.
             */
            //.addField("Inline Field", "They can also be inline.", true)
            /*
             * Blank field, useful to create some space.
             */
            //.addBlankField(true)
            //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
            msg.channel.send(embed);
        });


    }
};