const express = require("express");
const fileModule = require('./fileModule.js');

// const path = require('path');
const hbs = require("express-handlebars");
let app = express();
app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");



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
        return obj.qs;
}

var arr;
fileModule.readFileCustom("testModule.json",function(fileData){
        arr = JSON.parse(fileData);         
        app.get('/', function(req, res){
            res.render("home",{        
                //string: arr[Math.floor(Math.random() * arr.length)] 
                string: json(arr)
            });
        });
});







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