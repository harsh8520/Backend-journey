//Code ko readable banane ke liye, database ka connection function ham src/db/db.js me karenge and then uus function ko ham export karenge. Phir baadme iis function ko Server.js me use karenge
const mongoose = require('mongoose')

function connectToDB(){
    const connStr = "mongodb+srv://harshasoriya258_db_user:NBkM4iyNoCObqzo7@backend.mdwuxaq.mongodb.net/"
    mongoose.connect(connStr) //This returns a promise and therefore .then() ka use krte hai ham log
    .then(()=>{
        console.log("Connection to Database established successfully");
    })
}

module.exports = connectToDB