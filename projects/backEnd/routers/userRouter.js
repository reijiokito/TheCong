const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userInfo');

userRouter.get("/:userId",(req,res)=>{    
    userModel.findOne(req.params.userId)    
    .exec((err,user)=>{
        if(err) res.status(500).send({success: 0, err});
        else
            res.status(201).send({success:1,user});
    });
});

userRouter.put("/:userId",(req,res)=>{
    userModel.findById(req.params.userId)
    .then(user =>{
        if(!user)  res.status(404).send({success : 0, err:"Not Founed"});
        else{
            if(req.body.name) user.name = req.body.name;        
            if(req.body.username) user.username = req.body.username;
            if(req.body.hashpass) user.hashpass = req.body.hashpass;
            if(req.body.email) user.email = req.body.email;
            if(req.body.avartarUrl) user.avartarUrl = req.body.avartarUrl;
            if(req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
            
            
        }

        return user.save();        
    })
    .then(user => res.send({success: 1, msg:"Updated successfully!!"}))
    .catch(err => res.status(500).send({success: 0,err}));
    
});

userRouter.delete("/:userId",(req,res) =>{
    userModel.remove({_id: req.params.userId},(err)=>{
        if(err) res.send({success: 0, err});
        else
        res.send({success: 1, msg:"Deleted successfully!"});
    });
});

userRouter.post("/",(req,res) =>{
    userModel.create({
        name : req.body.name,      
        username : req.body.username,
        hashpass : req.body.hashpass,
        email : req.body.email,
        avartarUrl : req.body.avartarUrl,
        phoneNumber : req.body.phoneNumber
    },(err,userCreated)=>{
        if(err) res.send({success: 0,err});
        else
            res.send({success :1, userCreated});
    })
});

module.exports = userRouter;