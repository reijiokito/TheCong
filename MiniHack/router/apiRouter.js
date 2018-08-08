const express = require("express");
const  router = express.Router();
const infoModel = require("../models/infoModel");


router.use(function(req,res,next){
    console.log("api router");
    next();
});

router.post("/addInfo", (req, res) =>{

    let newInfo = {
        p1: req.body.p1,
        p2: req.body.p2,
        p3: req.body.p3,
        p4: req.body.p4,
        s1: req.body.s1,
        s2: req.body.s2,
        s3: req.body.s3,
        s4: req.body.s4,
        id: req.body.id
    };
    infoModel.find()
        .then(function(doc){                
            infoModel.update({_id : newInfo.id},{$set: {p1: newInfo.p1,p2 : newInfo.p2,p3:newInfo.p3,p4 : newInfo.p4,s1:newInfo.s1,s2:newInfo.s2,s3:newInfo.s3,s4:newInfo.s4}},() => {
                    res.redirect("/playscreen");            
                })            
        });

    
});

module.exports = router;