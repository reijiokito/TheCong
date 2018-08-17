const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routers/apiRouter");
const session = require("express-session");
const hbs = require("express-handlebars");

let app = express();


app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");



app.get('/', function(req, res){
    res.render("Login");
});

app.get("/signup",(req,res) =>{
    res.render("signUp");
});

app.get("/api/users",(req,res) =>{
    res.render("profile");
});

app.use(session({
    secret: "cotich",
    resave: false,
    saveUninitialized: false,
    cookie:{secure:false, maxAge: 7*24*60*60*1000,httpOnly:false}  //minisecond
}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/api",apiRouter);


app.use(express.static("./css"));

mongoose.connect("mongodb://localhost:27017/techkids-hotgirl",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
});

const port = 8989;
app.listen(port, (err) =>{
    if(err) console.log(err);
    else
        console.log(`Server is listening at port ${port}`);
});