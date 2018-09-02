const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InfoSchema = new Schema({
   players : [
       {type : String ,required : true}
   ],
   scores : [
       [
           {type : Number, required:true,default : 0}
       ]
   ] 
});

module.exports = mongoose.model("Info",InfoSchema);