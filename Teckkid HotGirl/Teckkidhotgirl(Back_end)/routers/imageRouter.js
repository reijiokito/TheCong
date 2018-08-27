const express = require("express");
const imageRouter = express.Router();
const imageModel = require("../models/imageModel");

imageRouter.get("/", function (req, res) {
    imageModel.find({})
    .populate("owner")
    .exec((err, images) =>{
        if (err) res.status(500).send({ success: 0, err });
        else
            res.status(201).send({ success: 1, images });

    });
});

imageRouter.post("/", function (req, res) {
    let { title,imageUrl, description, like, view, comment, owner } = req.body;
    imageModel.create({ title,imageUrl, description, like, view, comment, owner }, function (err, imageCreated) {
        if (err) res.status(500).send({ success: 0, err });
        else
            res.status(201).send({ success: 1, imageCreated });
    });
});



imageRouter.put("/:imageId",function(req,res){
    imageModel.findById({_id:req.params.imageId},function(err,image){
        console.log(image.comment);
        if (req.body.imageUrl) image.imageUrl = req.body.imageUrl;
        if (req.body.title) image.title = req.body.title;
        if (req.body.view) image.view = req.body.view;
        if (req.body.like) image.like = req.body.like;
        if (req.body.owner) image.owner = req.body.owner;
        if (req.body.description) image.description = req.body.description;
        if (req.body.comment) {
            const comment = image.comment;
            comment.push({user : req.body.comment.user._id,content: req.body.comment.content, createdAt: req.body.comment.user.createdAt,updatedAt: req.body.comment.user.updatedAt})            
            image.comment = comment;
            console.log(comment);
        }

        image.save(function(err,image){
            if(err) console.log(err);
            else
                res.json({message: "Update successfully-",image : image});
        });
    });
});

//Delete
imageRouter.delete("/:imageId",function(req,res){
    imageModel.remove({
        _id: req.params.imageId
    },function(err,image){
        if(err) console.log("Delete unsuccessfully");
        else
            res.json({message:"Delete image successfully"});
    })
});

imageRouter.get("/:imageId",function(req,res){
    imageModel.findById({_id: req.params.imageId})    
    .populate('owner','username email name avartarUrl')
    .populate('comment.user','username email avatarUrl name')
    .exec(function(err,image){
        if(err) res.status(500).send({success:0,errMsg:"Error get image"});
        else
            res.status(201).send({success:1,image});
    })
});

module.exports = imageRouter;