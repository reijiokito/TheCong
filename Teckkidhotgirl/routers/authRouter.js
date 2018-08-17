const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const userModel = require("../models/userModel");



authRouter.post('/login',(req,res) => {
    const { username,password} = req.body;

    if(!username || !password)
        res.status(400).send({success : 0, errMsg :"The User is not valid"});
    else{
        userModel.findOne({username})
        .then(userFound =>{
            if(!userFound)
                res.status(404).send({success:0, errMsg :"Not found User"});
            else{
                const compare = bcrypt.compareSync(password,userFound.hashpass);
                if(compare){                    
                    req.session.user = {username:userFound.username,name:userFound.name,userId : userFound._id};                    
                    res.send({success:1,message:"Login successfully",userId: userFound._id});
                }
                else res.status(401).send({success:0,message:"Password is invalid!"});
            }
        })
        .catch(error => res.status(500).send({success: 0,erMsg :"Server Catched Error"}));
    }
});

authRouter.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) res.status(500).send({success:0,err});
        else{
            res.send({success:1, message:"Successul!"});
        }
    });
});


module.exports = authRouter;