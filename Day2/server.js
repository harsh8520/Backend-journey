const express = require("express");

const app = express() //Server created

app.get('/home', (req,res) => {
    res.send("This is Home page");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})