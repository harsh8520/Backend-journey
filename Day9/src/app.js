import cookieParser from "cookie-parser"
import e from "express"
import authRoutes from "./routes/authRoute.js"
import notesRoute from "./routes/notesRoute.js"

const app = e()
app.use(e.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
.use('/note', notesRoute)

export default app