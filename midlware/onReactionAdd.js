var schems = require('../db/schems');
var disuser = schems.disuser;
var nconf = require('../config');
exports.add = function (emj, author) {

    console.log( dsbot.guilds.get('540105720071323649').members.get(author.id));
    if (author.id !== "540105252993499136") {
        if (emj.message.channel.type === "dm") {
            if (nconf.get(emj._emoji.id) === '541142425880494080') {
                disuser.findOne({userid: author.id}, function (err, rows) {
                    console.log(rows);
                    if (rows.guild === "0") {
                        dsbot.guilds.get('540105720071323649').members.get(author.id).addRole('541143492194205714')
                    }
                })
            }
            if (nconf.get(emj._emoji.id) === '540608887683022879') {
                disuser.findOne({userid: author.id}, function (err, rows) {
                    if (rows.guild === "0") {
                        dsbot.guilds.get('540105720071323649').members.get(author.id).addRole('541143597177765900')
                    }
                })
            }
            if (nconf.get(emj._emoji.id) === '541142369987461121') {
                disuser.findOne({userid: author.id}, function (err, rows) {
                    if (rows.guild === "0") {
                        dsbot.guilds.get('540105720071323649').members.get(author.id).addRole('541143734511992834')
                    }
                })
            }
            if (nconf.get(emj._emoji.id) === '540818876410363918') {
                disuser.findOne({userid: author.id}, function (err, rows) {
                    if (rows.guild === "0") {
                        dsbot.guilds.get('540105720071323649').members.get(author.id).addRole('541143815797604352')
                    }
                })
            }
            if (nconf.get(emj._emoji.id) === '540818876196323328') {
                disuser.findOne({userid: author.id}, function (err, rows) {
                    if (rows.guild === "0") {
                        dsbot.guilds.get('540105720071323649').members.get(author.id).addRole('541143914518937612')
                    }
                })
            }
        }
    }
};

exports.remove = function (emj, author) {

};