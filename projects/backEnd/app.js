const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');



const apiRouter = require('./routers/apiRouter');
const addressModel = require("./models/addressInfo");

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//render Trang chu
app.get("/",(req,res) =>{
    addressModel.find({})
    .exec((err,addresss) =>{        
        if(err) res.status(500).send({success : 0,err});
        else
            res.status(201).send({success : 1, addresss});
    })
});


 
app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    cookie:{secure:false, maxAge: 7*24*60*60*1000,httpOnly:false}  //minisecond
}));

app.use("/api",apiRouter);

app.use(cors({ origin: ['http://localhost:6969','http://localhost:3000'], credentials: true }));


mongoose.connect("mongodb://localhost:27017/Gym",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
});

const port = 6969;
app.listen(port, function(err){
    if(err) console.log(err);
    else console.log(`Server is running at port: ${port}`);
});