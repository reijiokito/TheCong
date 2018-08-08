const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const infoModel = require("./models/infoModel");
const bodyParser = require("body-parser");

const apiRouter = require('./router/apiRouter');

let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/api",apiRouter);


app.get("/",function(req,res){
    res.render("createscreen");
});

app.post("/playscreen", (req, res) =>{

    let newInfo = {
        p1: req.body.player1,
        p2: req.body.player2,
        p3: req.body.player3,
        p4: req.body.player4
    };
    infoModel.create(newInfo, (err, infoCreated) => {
        if(err) console.log(err);
        else
            res.redirect('/playscreen');
        

    });

    
});



app.get("/playscreen",function(req,res){
    infoModel.countDocuments({}, (err, infoListLength) => {
        //skip: bỏ qua bao nhiêu bản ghi
          infoModel.findOne({}).skip(infoListLength-1).exec((err, infoFound) => {

              if(err) console.error(err);
              else{
                  res.render("playscreen", {
                      Info: infoFound
                                        
                  });
              }
          })
      })
      

});

// app.get("/playscreen/api/addInfo",function(req,res){
//     infoModel.countDocuments({}, (err, infoListLength) => {
//         //skip: bỏ qua bao nhiêu bản ghi
//           infoModel.findOne({}).skip(infoListLength-1).exec((err, infoFound) => {

//               if(err) console.error(err);
//               else{
//                   infoModel.update({_id : infoFound._id},{$set: {s1: doc[0].yes + 1}},() => {
//                     res.redirect("/playscreen");            
//                 })
//               }
//           })
//       })
// });


app.use(express.static("./css"));

mongoose.connect("mongodb://localhost:27017/scorekeeper",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
})

app.listen(8080, function(err){
    if(err) console.log(err);
    else console.log("Server is running at port: 8080");
});