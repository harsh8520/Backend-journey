import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
})

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;