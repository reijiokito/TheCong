const express = require('express');
const apiRouter = express.Router();
const addressRouter = require('../routers/addressRouter');

apiRouter.use("/",(req,res,next) => {
    console.log(req.session);
    next();
});

apiRouter.get("/",(req,res) =>{
    res.send("Find Gymnastic API");
    console.log(req.session);
});

apiRouter.use("/address",addressRouter);

module.exports = apiRouter;