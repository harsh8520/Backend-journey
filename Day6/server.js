const express = require("express")
const connectToDB = require('./src/db/db.js')
const noteModel = require("./src/models/noteModel.js")

const app = express()
app.use(express.json())
connectToDB()

app.post("/notes", async (req, res) => {
    try {


        const body = req.body;
        if (!body.title || !body.content) return res.status(400).json({ message: "Title and content required" })

        const exists = await noteModel.findOne({
            title: body.title
        })
        if (exists) { return res.status(409).json({ message: "Note already exists" }) }

        await noteModel.create({
            title: body.title,
            content: body.content
        })

        return res.json({ message: "Note added successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
})

app.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find()
        res.json({
            message: "Notes fetch successfully",
            notes: notes
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
})

app.delete("/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id
        const exists = await noteModel.findById(noteId)
        if (!exists) return res.status(404).json({ message: "Note not found" })

        await noteModel.findOneAndDelete({
            _id: noteId
        })

        return res.json({ message: "note Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
})

app.patch("/notes/:id", async (req, res) => {
    try {
        const { title, content } = req.body
        const id = req.params.id
        if (!title || !content) return res.status(400).json({ message: "Title and content required" })

        const exists = await noteModel.findById(id)
        if (!exists) return res.status(404).json({ message: "note does not exist" })

        await noteModel.findByIdAndUpdate({
            _id: id,
        }, {
            title: title,
            content: content
        })

        return res.json({
            message: "Note Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
})

const port = 3000
app.listen(port, () => {
    console.log("Server is running on port - ", port);
})