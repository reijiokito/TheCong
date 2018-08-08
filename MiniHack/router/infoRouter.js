// const express = require("express");
// const router = express.Router();

// const InfoModel = require("../models/infoModel");
// const bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({extended : false}));
// router.use(bodyParser.json());

// router.all("/",function(req,res){
//     console.log("info router");

// });

// router.get("/",function(req,res){
//     InfoModel.find({_id: req.query._id},function(err,docs){
//         if(err) console.log(err);
//         else{
//             let info = docs[0];
//             console.log(docs[0]._id);
//             res.render("playscreen",{
//              info
//             });
//         }
//     });
    
// });

// module.exports = router;
