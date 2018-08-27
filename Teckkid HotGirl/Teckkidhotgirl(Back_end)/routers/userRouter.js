const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const bodyParser = require("body-parser");

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
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);
    userModel.create({ username, email, hashpass, name, avataUrl }, (err, userCreated) => {
        if (err) res.status(500).send({ success: 0, err });
        else res.status(201).send({ success: 1, userCreated });

    });
});


// DELETE TYPE 2
userRouter.delete("/delete/:userId", function (req, res) {
    userModel.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err) console.log(err);
        else
            res.json({ mesage: "Delete successful" });
    })
});

//get by id
//userRtouer.get
userRouter.get("/:userId", function (req, res) {    
    userModel.findById(req.params.userId, function (err, user) {
        if (err) res.status(500).send({ success: 0, err });
        else res.send({success:1,user: user});
    });
});


// Use async, await

userRouter.put("/update/:userId", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);

        if (!user) res.status(404).send({ success: 0, errMsg: "Not Founded" });
        else {

            if (req.body.name) user.name = req.body.name;
            let compare = bcrypt.compareSync(req.body.password, user.hashpass);
            if (!compare) {
                user.hashpass = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(11));                
            }            
            if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;
            if (req.body.email) user.email = req.body.email;
        }
        const userUpdated = await user.save();

        res.json({ mesage: "User updated!" });
    } catch (error) {
        res.json({ errMsg: "Error Update" });
    }

});


module.exports = userRouter;

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


//put(update)
// userRouter.put("/update/:userId",function(req,res){
//     userModel.findById(req.params.userId, function(err,user){
//         if(!user) res.status(404).send({success: 0,errMsg:"Not Founded"});

//         if (req.body.name) user.name = req.body.name;        
//         if (req.body.password) user.password = req.body.password;
//         if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;
//         if (req.body.email) user.email = req.body.email;
//         user.save(function(err){
//             if(err) console.log(err);
//             else
//                 res.json({mesage: "User updated!"});
//         })
//     });
// });

//Use Promise

// userRouter.put("/update/:userId",function(req,res){  
//     userModel.findById(req.params.userId)
//         .then(user => {
//             if(!user) res.status(404).send({success: 0,errMsg:"Not Founded"});
//             else{
//                 if (req.body.name) user.name = req.body.name;        
//                 if (req.body.password) user.password = req.body.password;
//                 if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;
//                 if (req.body.email) user.email = req.body.email;
//             }
//             return user.save();
//         })
//         .then(user => res.json({mesage: "User updated!"}))
//         .catch(error => res.status(500).send({success : 0,error}));               

// });