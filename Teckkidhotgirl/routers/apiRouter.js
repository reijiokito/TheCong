const express = require("express");
const apiRouter = express.Router();
const userRouter = require("../routers/userRouter");
const imageRouter = require("../routers/imageRouter");
const authRouter = require("../routers/authRouter");

apiRouter.use("/", (req, res, next) => {
    console.log("Stuck");
    // console.log(req.session);
    // console.log(req.sessionID);
    next();
});

apiRouter.get("/", (req, res) => {
    res.send("Teckid hotgirls api");
});

apiRouter.use("/users", userRouter);
apiRouter.use("/images",imageRouter);
apiRouter.use("/",authRouter);

module.exports = apiRouter;

