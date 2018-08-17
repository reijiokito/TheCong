const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : { type:String, require: true, unique: true},
    hashpass : {type: String, require : true},
    username : {type: String, require : true,uniue: true},
    avatarUrl : {type:String},
    name :{type:String}

},{
    timestamps: true
}
);


module.exports = mongoose.model("User",UserSchema);