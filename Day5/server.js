const express = require("express")
const connectToDB = require('./src/db/db.js')
connectToDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    console.log("Hello World");
})

const port = 3000
app.listen(port, () => {
    console.log("Server is running on port ", port);
})