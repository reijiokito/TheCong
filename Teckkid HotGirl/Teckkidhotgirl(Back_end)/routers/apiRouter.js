const express = require("express");
const apiRouter = express.Router();
const userRouter = require("../routers/userRouter");
const imageRouter = require("../routers/imageRouter");
const authRouter = require("../routers/authRouter");

apiRouter.use("/", (req, res, next) => {
    console.log(req.session);
    next();
});



apiRouter.get("/", (req, res) => {
    res.send("Teckid hotgirls api");
    console.log(req.session);
});

apiRouter.use("/users", userRouter);
apiRouter.use("/images",imageRouter);
apiRouter.use("/",authRouter);

module.exports = apiRouter;

