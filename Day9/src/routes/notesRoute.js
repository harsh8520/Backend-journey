import { Router } from "express";
import noteModel from "../models/noteModel.js";
import userModel from "../models/userModel.js";
import { auth } from "../middleware/authMiddleware.js";

const notesRoute = Router()

async function userExists(userId, res) {
    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json({ message: "User not found" })
    return user
}

async function fetchUsers(req, res) {
    const userId = req.user.id
    const user = await userExists(userId, res)

    return { userId, user }
}

notesRoute.post('/create', auth, async (req, res) => {
    const { userId, user } = await fetchUsers(req, res)

    const note = await noteModel.create({
        title: req.body.title,
        description: req.body.description,
        userId: userId
    })

    return res.status(201).json({ message: `Note created successfully for ${user.username}`, note })
})

notesRoute.patch('/edit/:id', auth, async (req, res) => {
    const { userId } = await fetchUsers(req, res)
    const noteId = req.params.id
    const note = await noteModel.findById(noteId)
    if (!req.body.title || !req.body.description) return res.status(400).json({ message: "Title and Description required" })

    if (!note) return res.status(404).json({ message: "Note does not exist" })
    if (userId != note.userId) return res.status(401).json({ message: "Unauthorised user" })

    const updatedNote = await noteModel.findByIdAndUpdate(noteId, {
        title: req.body.title,
        description: req.body.description
    })

    return res.status(200).json({ message: "Note updated successfully" })
})

notesRoute.delete('/delete/:id', auth, async (req, res) => {
    const { userId } = await fetchUsers(req, res)
    const noteId = req.params.id
    const note = await noteModel.findById(noteId)

    if (!note) return res.status(404).json({ message: "Note does not exist" })
    if (userId != note.userId) return res.status(401).json({ message: "Unauthorised user" })

    await noteModel.findByIdAndDelete(noteId)
    return res.status(200).json({ message: "Note deleted successfully" })
})

notesRoute.get('/', auth, async (req, res) => {
    const { userId, user } = await fetchUsers(req, res)

    const note = await noteModel.find({ userId: userId })

    res.status(200).json({ message: "Notes fetch successfully", note })
})

export default notesRoute