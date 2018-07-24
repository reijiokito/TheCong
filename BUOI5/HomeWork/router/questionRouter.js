const express = require("express");
const  router = express.Router();
const questionList = require("../question.json");

const QuestionModel = require("../models/questionModels");
// const fs = require("fs");
const bodyParser = require("body-parser");
//localhost:8989/question

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());


router.all("/",function(req,res){
    console.log("question router");
});
//app.get
router.get("/",function(req,res){
    QuestionModel.find({_id: req.query.questionId},function(err,docs){
        if(err) console.log(err);
        else{
            let question = docs[0];
            res.render("home",{
             question
            });
        }
    });
    // let question = questionList[req.query.questionId];
    // res.render("home",{
    //     question
    // });
});

router.get("/:questionId",function(req,res){
    
    QuestionModel.find({_id : req.params.questionId},function(err,docs){
        if(err) console.log(err);
        else {  
            let question = docs[0];            
            res.render("question",{
                question, //question : question
                totalVote: question.yes + question.no,        
                yes: 
                        Math.round((question.yes / (question.yes+question.no)*100) * 100)/100    
                ,                
                no: 
                        100-Math.round((question.yes / (question.yes+question.no)*100) * 100)/100                
            });      
        }  
    });

    // let question = questionList[req.params.questionId];

    // res.render("question",{
    //     question, //question : question
    //     totalVote: question.yes + question.no,        
    //     yes: Math.round((question.yes / (question.yes+question.no)*100) * 100)/100,
    //     no: 100-Math.round((question.yes / (question.yes+question.no)*100) * 100)/100
    // });
});

// router.post("/add",(req,res) => {
//     // console.log("Something!");
//     // req.on("data",(data) =>{
//     //     console.log(data);
//     // })
//    let newQuestion = {
//        content: req.body.question,
//     // yes : 0,
//     // no : 0,
//     // id : questionList.length
//     };
//     QuestionModel.create(newQuestion,function(err, questionCreated){
//         if(err) res.status(500).send({success: 0,errMsg : err});
//         else res.status(201).send({success: 1, questionId : questionCreated._id});
//         // if(err) console.log(err)
//         //     else
//         // res.redirect("/question/"+questionCreated._id);
//     });
//     // questionList.push(newQuestion);
//     // fs.writeFileSync("./question.json",JSON.stringify(questionList));
//     // res.redirect('/question/'+newQuestion.id);
// });

//app.all get post


module.exports = router;