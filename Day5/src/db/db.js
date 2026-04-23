//Code ko readable banane ke liye, database ka connection function ham src/db/db.js me karenge and then uus function ko ham export karenge. Phir baadme iis function ko Server.js me use karenge
const mongoose = require('mongoose')

async function connectToDB() {
    console.log("Connecting to database......");
    try {
        const connStr = "mongodb+srv://harshasoriya258_db_user:NBkM4iyNoCObqzo7@backend.mdwuxaq.mongodb.net/cohort"
        await mongoose.connect(connStr)
        console.log("Connection with database established");
    }
    catch(e) {
        console.log("Error during connecting with database");
        process.exit(1)
    }
}

module.exports = connectToDB