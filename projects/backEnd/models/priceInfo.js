const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let priceInfo = new Schema({
    expirationDate : {type: String},
    price : {type:Number}
});

module.exports = mongoose.model("price",priceInfo);