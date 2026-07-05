import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";

const commentRoutes = Router()

// Get comments for a post
commentRoutes.get("/post/:postId", async (req, res) => {
    try {
        const post = await postModel.findById(req.params.postId)
        if (!post) { return res.status(404).json({ message: "Post does not exist" }) }
        if (post.status === "draft") { return res.status(400).json({ message: "Post is not published yet" }) }

        const comments = await commentModel.find({ post: req.params.postId }).populate('createdBy')

        return res.status(200).json({ message: "Comments fetch successfully", comments })
    } catch (e) {
        console.log("Error - " + e);
        return res.status(500).json({ message: "Please enter a valid post id" })
    }
})

// Comment on a post
commentRoutes.post("/post/:postId", auth, async (req, res) => {
    const { content } = req.body

    const postId = req.params.postId
    const postExists = await postModel.findById(postId)
    if (!postExists) { return res.status(404).json({ message: "Post does not exist" }) }

    const comment = await commentModel.create({
        content,
        createdBy: req.user._id,
        post: postId,
    })

    postExists.comments.push(comment._id)
    await postExists.save()

    return res.status(201).json({ message: "Comment created successfully", comment })
})

// Edit or delete a comment
commentRoutes.patch("/:postId/:commentId", auth, async (req, res) => {
    const post = await postModel.findById(req.params.postId)
    if (!post) { return res.status(404).json({ message: "Post does not exist" }) }

    const comment = await commentModel.findById(req.params.commentId)
    if (!comment) { return res.status(404).json({ message: "Comment Does not exist" }) }

    if (comment.createdBy.toString() !== req.user._id.toString()) { return res.status(401).json({ message: "Unauthorized" }) }

    const postExistsForAComment = post.comments.find((p) => {
        return p.toString() === comment._id.toString()
    })
    if (postExistsForAComment === undefined) { return res.status(404).json({ message: "Comment does not exist for the post" }) }
    if (
        comment?._id.toString() !==
        postExistsForAComment.toString()
    ) {
        return res.status(404).json({ message: "Enter a valid Post or Comment Id" })
    }

    await commentModel.findByIdAndUpdate(req.params.commentId, {
        content: req.body.content,
        updatedAt: new Date()
    })

    return res.status(200).json({ message: "Comment Updated" })
})


commentRoutes.delete("/:postId/:commentId", auth, async (req, res) => {
    const post = await postModel.findById(req.params.postId)
    if (!post) { return res.status(404).json({ message: "Post does not exist" }) }

    const comment = await commentModel.findById(req.params.commentId)
    if (!comment) { return res.status(404).json({ message: "Comment Does not exist" }) }

    if (comment.createdBy.toString() !== req.user._id.toString()) { return res.status(401).json({ message: "Unauthorized" }) }


    const postExistsForAComment = post.comments.find((p) => {
        return p.toString() === comment._id.toString()
    })
    if (postExistsForAComment === undefined) { return res.status(404).json({ message: "Comment does not exist for the post" }) }

    post.comments = post.comments.filter((c) => c.toString() !== req.params.commentId)
    await post.save()

    await commentModel.findByIdAndDelete(req.params.commentId)

    return res.status(200).json({ message: "COmment Deleted successfully" })
})

export default commentRoutes;