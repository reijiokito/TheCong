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
    let { imageUrl, description, like, view, comment, owner } = req.body;
    imageModel.create({ imageUrl, description, like, view, comment, owner }, function (err, imageCreated) {
        if (err) res.status(500).send({ success: 0, err });
        else
            res.status(201).send({ success: 1, imageCreated });
    });
});



imageRouter.put("/update/:imageId",function(req,res){
    imageModel.findById({_id:req.params.imageId},function(err,image){
        if (req.body.imageUrl) image.imageUrl = req.body.imageUrl;
        if (req.body.view) image.view = req.body.view;
        if (req.body.like) image.like = req.body.like;
        if (req.body.owner) image.owner = req.body.owner;
        if (req.body.description) image.description = req.body.description;
        if (req.body.comment) image.comment = req.body.comment;

        image.save(function(err){
            if(err) console.log(err);
            else
                res.json({message: "Update successfully-"});
        });
    });
});

//Delete
imageRouter.delete("/delete/:imageId",function(req,res){
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
    .populate('owner')
    .populate('comment.user','username avatarUrl name')
    .exec(function(err,image){
        if(err) res.status(500).send({success:0,errMsg:"Error get image"});
        else
            res.status(201).send({success:1,image});
    })
});

module.exports = imageRouter;