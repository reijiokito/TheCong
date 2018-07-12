const express = require("express");
const fileModule = require('./fileModule.js');
const questionList = require('./question.json');
const fs = require('fs');
const bodyParser = require('body-parser');
// const path = require('path');
const hbs = require("express-handlebars");
let app = express();


app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended : false}))

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
    let rand=Math.floor(Math.random()*questionList.length)
    let question = questionList[rand];
    res.render("home",{
        question
    })
})

app.post("/question/add",(req,res) => {
    // console.log("Something!");
    // req.on("data",(data) =>{
    //     console.log(data);
    // })
    console.log(req.body);
   let newQuestion = {content: req.body.question,
    yes : 0,
    no : 0,
    id : questionList.length
    };
    questionList.push(newQuestion);
    fs.writeFileSync("./question.json",JSON.stringify(questionList));
    res.redirect('/question/'+newQuestion.id);
});


//param
//http://localhost:8989/question?questionId=1&hello=true
app.get('/question/:questionId',function(req,res){
    let question = questionList[req.params.questionId];

    res.render("question",{
        question, //question : question
        totalVote: question.yes + question.no,        
        yes: Math.round((question.yes / (question.yes+question.no)*100) * 100)/100,
        no: 100-Math.round((question.yes / (question.yes+question.no)*100) * 100)/100
    });
});

// //query
// app.get('question',function(req,res){
   
//     let question = questionList[req.query.questionId];
//     res.render("question",{
//         question, //question : question
//         totalVote: question.yes + question.no
//     });
// });

app.get("/answer/:questionId/:vote", (req, res) =>{
    questionList[req.params.questionId][req.params.vote] += 1;
    fs.writeFileSync('./question.json', JSON.stringify(questionList));
    res.redirect("/question/"+req.params.questionId);
})



app.get('/ask', function(req, res){
    res.render("ask");
});

app.get('/lyLy', function(req, res){
    res.sendFile(__dirname + '/36679921_961282454033603_5261075109258461184_n.jpg');
});

app.get('/html', function(req, res){
    res.sendFile(__dirname + '/Example.html');
});

// app.get('/cross', function(req, res){
//     res.sendFile(path.resolve(__dirname, "../css cont/home.html"));
// });

app.listen(8989, function(err){
    if(err) console.log(err)
    else console.log("Server is listening at port: 8989");
});