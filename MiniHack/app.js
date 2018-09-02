const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const infoModel = require("./models/infoModel");
const bodyParser = require("body-parser");
const cors = require('cors');
const apiRouter = require('./router/apiRouter');

let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/api",apiRouter);


// app.get("/",function(req,res){
//     res.render("createscreen");
// });
app.use(cors({ origin: ['http://localhost:8080','http://localhost:3000'], credentials: true }));

app.post("/screen", (req, res) =>{

    let newInfo = {
        players : req.body.players,
        scores : req.body.scores
    };
    infoModel.create(newInfo, (err, infoCreated) => {
        if(err) console.log(err);
        else res.send({success :1,infoCreated : infoCreated});
            // res.redirect('/playscreen');
        

    });

    
});

app.use(express.static("./css"));

mongoose.connect("mongodb://localhost:27017/scorekeeper",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
})

app.listen(8080, function(err){
    if(err) console.log(err);
    else console.log("Server is running at port: 8080");
});