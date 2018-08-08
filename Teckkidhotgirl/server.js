const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routers/apiRouter");


let app = express();


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/api",apiRouter);


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