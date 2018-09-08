const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let addressInfo = new Schema({
    name : {type : String, reuiqre : true},
    imageURL : {type : String, require : true},
    rooms : [
        {type: Schema.Types.ObjectId,ref:'room'}
    ]
});

module.exports = mongoose.model("address",addressInfo);