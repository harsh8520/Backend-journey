import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const noteModel = mongoose.model("Note", noteSchema)

export default noteModel