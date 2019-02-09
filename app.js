var Discord = require("discord.js");
var onMessage = require('./midlware/onMessage');
var onMemberAdd = require('./midlware/onMemberAdd');
var onReactionAdd = require('./midlware/onReactionAdd');
var fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quiz');
global.db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db ready')
});


var {Client, RichEmbed, Attachment} = require('discord.js');
global.dsbot = new Discord.Client();
dsbot.music = require("discord.js-musicbot-addon");

// Now we start the music module.
dsbot.music.start(dsbot, {
    // Set the api key used for YouTube.
    // This is required to run the bot.
    youtubeKey: 'AIzaSyBXX4f-fQW1vLpgYvvlT0KiuGkwOEkW7jc'
});

dsbot.login("NTQwMTA1MjUyOTkzNDk5MTM2.DzMDvA.KKkWUxC0WkVByUqUy9pnxGDxebA");

dsbot.on('ready',function () {

    gm('image.png')
        .flip()
        .write('/crazy.jpg', function (err) {
            if (!err){ console.log('crazytown has arrived')
            } else {
                console.log( dsbot.guilds.get('540105720071323649').channels.get('541144879862906880'));
           dsbot.guilds.get('540105720071323649').channels.get('541144879862906880').send(""+ err+ "");
            }
        });
    console.log(`Logged in as ${dsbot.user.tag}!`);
});

dsbot.on('message', onMessage.commands);
dsbot.on('guildMemberAdd', onMemberAdd.commands);
dsbot.on('messageReactionAdd', onReactionAdd.add);
dsbot.on('messageReactionRemove', onReactionAdd.remove);

