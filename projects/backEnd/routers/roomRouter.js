const express = require("express");
const roomRouter = express.Router();
const roomInfo = require("../models/roomInfo");

roomRouter.get("/:roomId",(req,res)=>{    
    roomInfo.findOne(req.params.roomId)
    .populate("PT")
    .exec((err,room)=>{
        if(err) res.status(500).send({success: 0, err});
        else
            res.status(201).send({success:1,room});
    });
});

roomRouter.put("/:roomId",(req,res)=>{
    roomInfo.findById(req.params.roomId)
    .then(room =>{
        if(!room)  res.status(404).send({success : 0, err:"Not Founed"});
        else{
            if(req.body.roomName) room.name = req.body.roomName;
            if(req.body.imageURL) room.imageURL = req.body.imageURL;
            if(req.body.machines) room.machines = req.body.machines;
            if(req.body.price) room.price = req.body.price;
            if(req.body.PT) room.PT = req.body.PT;            
            if(req.body.description) room.description = req.body.description;
            if(req.body.stars) room.stars = req.body.stars;  
            if(req.body.location) room.location = req.body.location;                      
        }

        return room.save();        
    })
    .then(room => res.send({success: 1, msg:"Updated successfully!!"}))
    .catch(err => res.status(500).send({success: 0,err}));
    
});

roomRouter.delete("/:roomId",(req,res) =>{
    roomInfo.remove({_id: req.params.roomId},(err)=>{
        if(err) res.send({success: 0, err});
        else
        res.send({success: 1, msg:"Deleted successfully!"});
    });
});

roomRouter.post("/",(req,res) =>{
    roomInfo.create({
        name : req.body.roomName,
        imageURL : req.body.imageURL,
        machines : req.body.machines,
        price : req.body.price,
        PT : req.body.PT,   
        description : req.body.description,
        stars : req.body.stars,
        location : req.body.location
    },(err,roomCreated)=>{
        if(err) res.send({success: 0,err});
        else
            res.send({success :1, roomCreated});
    })
});
module.exports = roomRouter;