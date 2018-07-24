const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const QuestionModel = require("../models/questionModels");

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(function(req,res,next){
    console.log("API router");
    next();
});
router.post("/addQuestion",(req,res) => {
   let newQuestion = {
       content: req.body.question,

    };
    QuestionModel.create(newQuestion,function(err, questionCreated){        
        if(err) res.status(500).send({success: 0,errMsg : err});
        else res.status(201).send({success: 1, questionId : questionCreated._id});

    });

});

router.get("/answer/:questionId/:vote", (req, res) =>{
    QuestionModel.find()
        .then(function(doc){
            let voteOp = req.params.vote;
    
            if(voteOp=="yes"){
                QuestionModel.update({_id : req.params.questionId},{$set: {yes: doc[0].yes + 1}},() => {
                    res.redirect("/question/"+req.params.questionId);            
                })
            }else{
                QuestionModel.update({_id : req.params.questionId},{$set: {no: doc[0].no + 1}},() => {
                    res.redirect("/question/"+req.params.questionId);            
                })
            }
        });
    // questionList[req.params.questionId][req.params.vote] += 1;
    // fs.writeFileSync('./question.json', JSON.stringify(questionList));
    // res.redirect("/question/"+req.params.questionId);
});

module.exports = router;