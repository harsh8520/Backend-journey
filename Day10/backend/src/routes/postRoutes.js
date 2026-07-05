import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { userExists } from "../utils/validateUser.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import commentModel from "../models/commentModel.js";

const postRoutes = Router()

// Get all posts even for non logged in users
postRoutes.get("/", async (req, res) => {
    try {
        const posts = await postModel.find({ status: "published" }).populate('comments').populate('user')
        if (!posts) { return res.status(404).json({ message: "Post Not Found" }) }

        return res.status(200).json({ message: "Posts fetchted successfully", posts })
    } catch (error) {
        console.log("Error - " + error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

//Get a specific post
postRoutes.get('/:id', async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id).populate('comments').populate('user', 'username email')
        if (!post) { return res.status(404).json({ message: "Post Not Found" }) }

        return res.status(200).json({ message: "Post Fetch Successfully", post })

    } catch (error) {
        console.log("Error - " + error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

//Get all posts for a user
postRoutes.patch('/:userId', async (req, res) => {
    const userId = req.params.userId

    const post = await postModel.find({ user: userId })
    if (!post) { return res.status(404).json({ message: "No Post for this user" }) }

    res.status(200).json({ message: "Here are your post", post })
})


// Create, edit or delete a post
postRoutes.post("/", auth, async (req, res) => {
    const user = req.user
    // validate title and content
    const { title, content, status } = req.body
    if (!title?.trim() || !content?.trim()) { return res.status(400).json({ message: "Title and content are required" }) }

    // create post
    const post = await postModel.create({
        title,
        content,
        status,
        publishedAt: status === "published" ? new Date().toISOString() : null,
        user: user._id
    })

    user.posts.push(post._id)
    await user.save()

    return res.status(201).json({ message: "Post created successfully", post })
})

postRoutes.put("/:id", auth, async (req, res) => {
    const postId = req.params.id
    const user = req.user._id
    console.log(user);
    // validate input
    const { title, content, status } = req.body
    if (!title?.trim() || !content?.trim()) { return res.status(400).json({ message: "Title and content are required" }) }

    // check post ownership
    const post = await postModel.findById(postId)
    if (!post) { return res.status(404).json({ message: "Post does not exist" }) }
    if (post.user.toString() !== user.toString()) { return res.status(401).json({ message: "Unauthorized" }) }

    //update post
    const updatedPost = await postModel.findByIdAndUpdate(postId, {
        title,
        content,
        status,
        publishedAt: status === "published" ? new Date().toISOString() : null,
        updatedAt: new Date()
    }).populate('comments')

    return res.status(200).json({ message: "Post updated Successfully", updatedPost })
})

postRoutes.delete("/:userId/:postId", auth, async (req, res) => {
    const postId = req.params.postId
    const userId = req.user._id

    const user = await userModel.findById(userId)
    if (!user) { return res.status(404).json({ message: "User does not exist" }) }

    const post = await postModel.findById(postId)
    if (!post) { return res.status(404).json({ message: "Post does not exist" }) }

    if (post.user.toString() !== user._id.toString()) { return res.status(401).json({ message: "Unauthorized" }) }

    user.posts = user.posts.filter((p) => p.toString() !== postId)
    await user.save()

    await commentModel.deleteMany({
        post: postId
    })
    await postModel.findByIdAndDelete(postId)

    return res.status(200).json({ message: "Post deleted successfully" })
})



export default postRoutes;