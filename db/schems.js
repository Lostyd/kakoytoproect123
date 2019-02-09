var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  String,
    vkid: String,
    tag: String,
    avatar: String,
    userid: String,
    uuid: String,
    exp: Number,
    lvl: Number,
    cash: Number,
    bank: Number,
    guild: String,
    messagedate: Number
});

var roleSchema = new Schema({
    lvl: String,
    roleID: String
});

var guildsSchema = new Schema({
   name: String,
   emj: String,
   emjID: String,
   role: String,
   roleID: String
});
exports.disguild = mongoose.model('guilds', guildsSchema);
exports.disSetRole = mongoose.model('roles', roleSchema);
exports.disuser = mongoose.model('users', userSchema);