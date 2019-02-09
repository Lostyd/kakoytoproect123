var schems = require('../db/schems');
var disuser = schems.disuser;
var nconf = require('../config');
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 *
 * @param guild.id
 * guild.user.id
 * guild.user.username
 * guild.user.discriminator
 * guild.user.avatarURL
 * uuidv4()
 */
exports.commands = function (guild) {
    if(guild.guild.id === '540105720071323649'){
     guild.guild.members.get(guild.user.id).addRole(nconf.get('1'));
        var newUser = new disuser({
            'avatar': guild.user.avatarURL,
            'userid': guild.user.id,
            'uuid': uuidv4(),
            'exp': 0,
            'lvl': 1,
            'cash': 0,
            'bank': 0,
            'messagedate': 0,
            'guild': "0"
        });
        newUser.save(function (err, result) {
        });
    }
};



