const express = require('express');
const addressRouter = express.Router();
const addressModel = require('../models/addressInfo');

addressRouter.get("/:addressId",(req,res)=>{    
    addressModel.findOne(req.params.addressId)
    .populate("rooms")
    .exec((err,address)=>{
        if(err) res.status(500).send({success: 0, err});
        else
            res.status(201).send({success:1,address});
    });
});

addressRouter.put("/:addressId",(req,res)=>{
    addressModel.findById(req.params.addressId)
    .then(address =>{
        if(!address)  res.status(404).send({success : 0, err:"Not Founed"});
        else{
            if(req.body.name) address.name = req.body.name;
            if(req.body.imageURL) address.imageURL = req.body.imageURL;
            if(req.body.rooms) address.rooms = req.body.rooms;
        }

        return address.save();        
    })
    .then(address => res.send({success: 1, msg:"Updated successfully!!"}))
    .catch(err => res.status(500).send({success: 0,err}));
    
});

addressRouter.delete("/:addressId",(req,res) =>{
    addressModel.remove({_id: req.params.addressId},(err)=>{
        if(err) res.send({success: 0, err});
        else
        res.send({success: 1, msg:"Deleted successfully!"});
    });
});

addressRouter.post("/",(req,res) =>{
    addressModel.create({
        name : req.body.name,
        imageURL : req.body.imageURL,
        rooms : req.body.rooms
    },(err,addressCreated)=>{
        if(err) res.send({success: 0,err});
        else
            res.send({success :1, addressCreated});
    })
});

module.exports = addressRouter;