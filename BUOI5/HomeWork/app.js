const express = require("express");

const apiRouter = require("./router/apiRouter");
const fileModule = require('./fileModule.js');
const questionList = require('./question.json');
const fs = require('fs');
// const bodyParser = require('body-parser');
const QuestionModel = require("./models/questionModels");

const mongoose = require("mongoose");

const questionRouter = require("./router/questionRouter");

// const path = require('path');
const hbs = require("express-handlebars");



let app = express();




app.engine("handlebars", hbs({defaultLayout: "main"}));

app.set("view engine", "handlebars");

// app.use(bodyParser.urlencoded({extended : false}))


app.use("/question",questionRouter);
app.use("/api",apiRouter);

// app.use(function(req, res, next){
//     console.log("MiddleWare !!!");
//     next();
// });

app.use(express.static(__dirname));


// app.get('/',function(req, res){
//     res.send("<h1 style = 'color: red;'>Hello THANG VD !!!</h1>");  
// });
const json = function(arr){
    
        let i = Math.floor(Math.random() * arr.length)
        var obj = arr[i];    
        return obj;
}

var arr;
fileModule.readFileCustom("testModule.json",function(fileData){
    arr = JSON.parse(fileData);                 
});


// app.get('/', function(req, res){
//     res.render("home",{        
//         //string: arr[Math.floor(Math.random() * arr.length)] 
//         question: json(arr).content
//     });
// });

app.get(["/"],function(req,res){
    QuestionModel.find()
        .then(function(doc){
            let rand=Math.floor(Math.random()*doc.length)
            let question = doc[rand];
            res.render("home",{
                question
            })
        });    
    // let rand=Math.floor(Math.random()*questionList.length)
    // let question = questionList[rand];
    // res.render("home",{
    //     question
    // })
});

// app.post("/question/add",(req,res) => {
//     // console.log("Something!");
//     // req.on("data",(data) =>{
//     //     console.log(data);
//     // })
//     console.log(req.body);
//    let newQuestion = {content: req.body.question,
//     yes : 0,
//     no : 0,
//     id : questionList.length
//     };
//     questionList.push(newQuestion);
//     fs.writeFileSync("./question.json",JSON.stringify(questionList));
//     res.redirect('/question/'+newQuestion.id);
// });


//param
// app.get('/question/:questionId',function(req,res){
//     let question = questionList[req.params.questionId];

//     res.render("question",{
//         question, //question : question
//         totalVote: question.yes + question.no,        
//         yes: Math.round((question.yes / (question.yes+question.no)*100) * 100)/100,
//         no: 100-Math.round((question.yes / (question.yes+question.no)*100) * 100)/100
//     });
// });


// app.get("/answer/:questionId/:vote", (req, res) =>{
//     QuestionModel.find()
//         .then(function(doc){
//             let voteOp = req.params.vote;
    
//             if(voteOp=="yes"){
//                 QuestionModel.update({_id : req.params.questionId},{$set: {yes: doc[0].yes + 1}},() => {
//                     res.redirect("/question/"+req.params.questionId);            
//                 })
//             }else{
//                 QuestionModel.update({_id : req.params.questionId},{$set: {no: doc[0].no + 1}},() => {
//                     res.redirect("/question/"+req.params.questionId);            
//                 })
//             }
//         });
//     // questionList[req.params.questionId][req.params.vote] += 1;
//     // fs.writeFileSync('./question.json', JSON.stringify(questionList));
//     // res.redirect("/question/"+req.params.questionId);
// });






app.get('/ask', function(req, res){
    res.render("ask");
});

app.get('/lyLy', function(req, res){
    res.sendFile(__dirname + '/36679921_961282454033603_5261075109258461184_n.jpg');
});

app.get('/html', function(req, res){
    res.sendFile('E:/TheCong/BUOI5/Index.html');
});

// app.get('/cross', function(req, res){
//     res.sendFile(path.resolve(__dirname, "../css cont/home.html"));
// });

mongoose.connect("mongodb://localhost:27017/HomeWork",{useNewUrlParser: true},function(err){
    if (err) 
        console.log(err)
    else
        console.log("DB connect success!");
});

app.listen(8989, function(err){
    if(err) console.log(err)
    else console.log("Server is listening at port: 8989");
});