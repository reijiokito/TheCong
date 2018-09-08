const express = require("express");
const PTRouter = express.Router();
const PTInfo = require("../models/PTInfo");

PTRouter.get("/:PTId",(req,res)=>{    
    PTInfo.findOne(req.params.PT)
    .populate("users")
    .exec((err,PT)=>{
        if(err) res.status(500).send({success: 0, err});
        else
            res.status(201).send({success:1,PT});
    });
});

PTRouter.put("/:PTId",(req,res)=>{
    PTInfo.findById(req.params.PTId)
    .then(PT =>{
        if(!PT)  res.status(404).send({success : 0, err:"Not Founed"});
        else{
            if(req.body.firstName) PT.firstName = req.body.firstName;
            if(req.body.lastName) PT.lastName = req.body.lastName;
            if(req.body.imageURL) PT.imageURL = req.body.imageURL;
            if(req.body.dob) PT.dob = req.body.dob;
            if(req.body.experience) PT.experience = req.body.experience;            
            if(req.body.users) PT.users = req.body.users;
                    
        }

        return PT.save();        
    })
    .then(PT => res.send({success: 1, msg:"Updated successfully!!"}))
    .catch(err => res.status(500).send({success: 0,err}));
    
});

PTRouter.delete("/:PTId",(req,res) =>{
    PTInfo.remove({_id: req.params.PTId},(err)=>{
        if(err) res.send({success: 0, err});
        else
        res.send({success: 1, msg:"Deleted successfully!"});
    });
});

PTRouter.post("/",(req,res) =>{
    PTInfo.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        imageURL :  req.body.imageURL,
        dob : req.body.dob,
        experience : req.body.experience,        
        users : req.body.users
    },(err,PTCreated)=>{
        if(err) res.send({success: 0,err});
        else
            res.send({success :1, PTCreated});
    })
});
module.exports = roomRouter;