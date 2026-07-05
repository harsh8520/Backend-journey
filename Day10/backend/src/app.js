import cookieParser from "cookie-parser";
import e from "express";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from 'cors'

const app = e();

app.use(e.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString();

    console.log(
        `[${timestamp}] ${req.method} ${req.originalUrl}`
    );

    next();
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)



export default app;