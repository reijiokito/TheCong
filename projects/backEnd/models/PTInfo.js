const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PTInfo = new Schema({
    firstName : {type: String},
    lastName : {type: String},
    imageURL : {type: String},
    dob : {type : String},
    experience : {type:String},
    users : [
        {type : Schema.Types.ObjectId,ref:'user'}
    ]
});

module.exports = mongoose.model("PT",PTInfo);