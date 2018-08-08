const express = require("express");
const apiRouter = express.Router();
const userRouter = require("../routers/userRouter");
const imageRouter = require("../routers/imageRouter");

apiRouter.use("/", (req, res, next) => {
    console.log("Stuck");
    next();
});

apiRouter.get("/", (req, res) => {
    res.send("Teckid hotgirls api");
});

apiRouter.use("/users", userRouter);
apiRouter.use("/images",imageRouter);

module.exports = apiRouter;

