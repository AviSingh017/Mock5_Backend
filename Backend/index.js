const express = require("express");
const app = express();
const { Connection } = require("./config/db");
const {empRouter} = require("./routes/dashboard");
const {userRouter} = require("./routes/user");
app.use(express.json());


app.use("/", empRouter);
app.use("/", userRouter);



app.get("/", (req, res) => {
    res.send("This is Backend Working");
});

app.listen(4500, async () => {
    try {
        await Connection;
        console.log("Connected to DB");
    }
    catch (err) {
        console.log(err);
    }
    console.log("Server is running on port 4500");
});