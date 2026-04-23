require('dotenv').config()
const mongoose = require('mongoose')

async function connectToDB() {
    try {
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection Established successfully");
    } catch (e) {
        console.log("Error -",e);
        process.exit(1)
    }
}

module.exports = connectToDB