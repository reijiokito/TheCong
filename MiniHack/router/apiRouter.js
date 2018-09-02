const express = require("express");
const  router = express.Router();
const infoModel = require("../models/infoModel");
const cors = require('cors');

router.use(cors({ origin: ['http://localhost:8080','http://localhost:3000'], credentials: true }));

router.use(function(req,res,next){
    console.log("api router");
    next();
});


router.put("/game/:infoId",function(req,res){
    infoModel.findById({_id:req.params.infoId},function(err,info){
        if(req.body.players) info.players = req.body.players;
        if(req.body.scores) info.scores = req.body.scores;
        info.save(function(err,infoSaved){
            if(err) console.log(err);
            else
                res.send({success :1,info : infoSaved});
        });
    });
});

router.get("/game/playscreen",function(req,res){
    infoModel.countDocuments({}, (err, infoListLength) => {
        //skip: bỏ qua bao nhiêu bản ghi
          infoModel.findOne({}).skip(infoListLength-1).exec((err, infoFound) => {

              if(err) console.error(err);
              else res.send({success: 1, infoFound : infoFound});

          })
      })
      

});

router.get("/game/:infoId",function(req,res){
    infoModel.findById(req.params.infoId, (err, infoFound) => {
        if(err) console.log(err)
        else
          res.send({success:1, info : infoFound})
      });
      

});
module.exports = router;