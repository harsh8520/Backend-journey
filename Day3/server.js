const express = require("express");

const app = express()
app.use(express.json()) // req.body me data chahiye toh ye middleware use krna hota hai. By default body me data nahi aata, middleware use krna padta hai

let notes = []

app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)

    res.json({
        message: "Notes added successfully",
        notes: notes
    })
})

app.delete('/delete', (req,res) => {
    const query = req.query.title

    const exists = notes.some((n) => n.title === query)

    if(!exists) return res.json({message:"Note does not exist"})

    notes = notes.filter((n) => n.title !== query)

    res.json({
        message:"Note deleted",
        notes: notes
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})