const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userInfo = new Schema({
    name : {type: String},
    email : {type: String},
    phoneNumber : {type: String},
    hashpass : {type: String, require : true},
    username : {type: String, require : true,uniue: true},
    avatarUrl : {type:String}

});

module.exports = mongoose.model("user",userInfo);