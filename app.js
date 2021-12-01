require("dotenv").config();
const express = require("express");
const app = express();
// const port = 5000
const userRouter = require("./api/users/user.router");


app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This rest APIs are working"
    });
});

app.use(express.json());

app.use("/api/users", userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT : ", process.env.APP_PORT);
});