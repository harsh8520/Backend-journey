import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

const userModel = mongoose.model("User", userSchema);
export default userModel;