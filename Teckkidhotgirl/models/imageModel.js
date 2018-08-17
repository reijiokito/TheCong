const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId,ref:'User'},
    content:{type: String, require:true},
    // created_at: {type: String,default:new Date().toLocaleDateString()}
},{
    timestamps: true,
    _id:false
}
);

const ImageSchema = new Schema({
    imageUrl: { type: String, require: true },
    description: { type: String },    
    view: { type: Number,default:0 },    
    like: { type: Number,default:0},
    comment: [(commentSchema)],
    owner: {type: Schema.Types.ObjectId,ref:'User'}

}, {
        timestamps: true
    }
);


module.exports = mongoose.model("Image", ImageSchema);