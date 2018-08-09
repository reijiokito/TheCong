const express = require("express");
const  router = express.Router();
const infoModel = require("../models/infoModel");


router.use(function(req,res,next){
    console.log("api router");
    next();
});


router.put("/update/:infoId",function(req,res){
    infoModel.findById({_id:req.params.infoId},function(err,info){
        if (req.body.p1) info.p1 = req.body.p1;
        if (req.body.p2) info.p2 = req.body.p2;
        if (req.body.p3) info.p3 = req.body.p3;
        if (req.body.p4) info.p4 = req.body.p4;
        if (req.body.s1) info.s1 = req.body.s1;
        if (req.body.s2) info.s2 = req.body.s2;
        if (req.body.s3) info.s3 = req.body.s3;
        if (req.body.s4) info.s4 = req.body.s4;
        info.save(function(err){
            if(err) console.log(err);
            else
                console.log("update successfully");
        });
    });
});

module.exports = router;