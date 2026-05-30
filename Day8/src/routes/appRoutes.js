import e from "express";
import auth from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
const routes = e.Router()


routes.get('/public', (req, res) => {
    res.json({ message: "Hey there, this is public route" })
})

routes.get('/user', auth, (req, res) => {
    res.json({ message: `Hey there ${req.user.name} how are you` })
})

routes.get('/admin', auth, isAdmin, (req, res) => {
    res.json({ message: "Hey there admin how are you" })
})

export default routes