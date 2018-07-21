const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    content: { type: String, required: true},
    yes: {type: Number, default: 50},
    no: {type: Number, default: 50},
},{
    timestamps : true       // se mac dinh tao ra 2 truong date va time
});

module.exports = mongoose.model("Question",QuestionSchema); //co the them, sua , xoa