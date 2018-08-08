const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");

//CRUD - create - read - update - delete
//get all: Get -> /api/users
userRouter.get("/", (req, res) => {
    userModel.find({}, (err, users) => {
        if (err) res.status(500).send({ success: 0, err });
        else 
            res.status(201).send({ success: 1, users });      
    });
});

//Create new 
userRouter.post("/", (req, res) => {
    const { username, email, password, name, avataUrl } = req.body;
    userModel.create({ username, email, password, name, avataUrl }, (err, userCreated) => {
        if (err) res.status(500).send({ success: 0, err });
        else res.status(201).send({ success: 1, userCreated });
        
    });
});

//Delete
//userRouter.delete
/* DELETE TYPE 1:
userRouter.get("/delete/:userId",function(req,res){
    console.log(req.params.userId);
    userModel.findById({_id: req.params.userId},function(err,user){
        user.remove(function(err,user){
            if(err) console.log(err);
            res.json({message:"delele successfully"});
        })
    });
});
*/
// DELETE TYPE 2
userRouter.delete("/delete/:userId",function(req,res){
    console.log(req.params.userId);
    userModel.remove({
        _id: req.params.userId
    },function(err,user){
        if(err) console.log(err);
        else
            res.json({mesage: "Delete successful"});
    })
});

//get by id
//userRtouer.get
userRouter.get("/:userId",function(req,res){
    userModel.findById(req.params.userId,function(err,user){
        if (err) res.status(500).send({ success: 0, err });
        else res.status(201).send({ success: 1, user });  
    });
});

//put(update)
userRouter.put("/update/:userId",function(req,res){
    userModel.findById(req.params.userId, function(err,user){
        if (req.body.name) user.name = req.body.name;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;
        if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;
        if (req.body.email) user.email = req.body.email;
        user.save(function(err){
            if(err) console.log(err);
            else
                res.json({mesage: "User updated!"});
        })
    });
});
module.exports = userRouter;