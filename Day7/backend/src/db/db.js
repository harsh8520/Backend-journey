import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to database successfully");
    } catch (e) {
        console.log("Error - "+e);
    }
}

export default connectToDB