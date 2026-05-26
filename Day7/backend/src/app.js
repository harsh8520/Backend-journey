import express from 'express'
import songRoute from './routes/songRoute.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/songs',songRoute)

export default app