import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: String,
    author: String,
    audio: String,
    mood: String
});

export default mongoose.model("Songs", songSchema);