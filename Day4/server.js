const express = require("express")

const app = express()
app.use(express.json())

let notes = []

app.post('/create', (req, res) => {
    const body = req.body
    if (!body.title || !body.description) { return res.status(400).json({ message: "Title and description are required" }) }

    const exists = notes.some((n) => n.title === body.title)
    if (exists) { return res.status(409).json({ message: "Note already Exists" }) }

    notes.push(body)
    return res.json({
        message: "Note added successfully",
        notes: notes
    })
})

app.delete('/delete/:title', (req, res) => {
    const title = req.params.title
    if(!title) { return res.status(400).json({message:"Title is required"}) }

    const exists = notes.some((n) => n.title === title)
    if (!exists) { return res.status(404).json({ message: "Note does not exists. Enter correct note title." }) }

    notes = notes.filter((n) => n.title !== title)

    return res.json({
        message: `Note with title '${title}' deleted Successfully`,
        notes: notes
    })
})

app.patch('/update/:title', (req, res) => {
    const body = req.body
    const title = req.params.title
    if (!title || !body.description) { return res.status(400).json({ message: "Title and description are required" }) }

    const exists = notes.some((n) => n.title === title)
    if (!exists) { return res.status(404).json({ message: "Note does not exists. Enter correct note title." }) }


    notes = notes.map((n) => {
        if (n.title === title) return { title, description: body.description }
        else return n
    })

    return res.json({
        message: 'Note updated successfully',
        notes: notes
    })
})

app.get('/', (req, res) => {
    res.json({ notes: notes })
})

const port = 3000
app.listen(port, () => {
    console.log("Server is running on port ", port);
})