import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ] 
})

const postModel = mongoose.model("Post", postSchema);
export default postModel;