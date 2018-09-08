const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let roomInfo = new Schema({
    roomName : {type: String, require:true},
    imageURL : [
        {type : String}
    ],
    PT : [
        {type:Schema.Types.ObjectId,ref:'PT'}
    ],
    machines : [
        {type: String}
    ],
    price : [
        {type:Schema.Types.ObjectId,ref:'price'}
    ],
    stars : {type : Number},
    description : {type:String},
    location : {type : String, require:true}
});


module.exports = mongoose.model("room",roomInfo);