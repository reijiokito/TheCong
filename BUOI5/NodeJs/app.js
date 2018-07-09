const express = require("express");

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
app.get('/', function(req, res){
    res.render("home",{
        number: Math.floor(Math.random()*99),
        htmlString: '<span style = "color:red;">Hi!</span>'
    });
});

app.get('/about', function(req, res){
    res.render("about");
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

app.listen(5398, function(err){
    if(err) console.log(err)
    else console.log("Server is listening at port: 5398");
});