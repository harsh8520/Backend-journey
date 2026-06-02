import { Router } from "express";
import userModel from "../models/userModel.js";
import { auth } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const authRoutes = Router()

authRoutes.post('/register', async (req, res) => {
    const body = req.body
    if (!body.username || !body.password) return res.json({ message: "Username and password required" })

    const userExists = await userModel.findOne({ username: body.username })
    if (userExists) return res.json({ message: "User already exists, Please log in" })

    const hashedPass = await bcrypt.hash(body.password, 10)
    await userModel.create({
        username: body.username,
        password: hashedPass
    })

    res.status(201).json({ message: "User Registered successfully" })
})

authRoutes.post('/login', async (req, res) => {
    const body = req.body

    const userExists = await userModel.findOne({ username: body.username })
    if (!userExists) return res.status(404).json({ message: "User does not exist" })

    const isMatch = await bcrypt.compare(
        body.password,
        userExists.password
    );
    if (!isMatch) return res.status(400).json({ message: "invalid credentials" })

    const token = jwt.sign({
        id: userExists._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    return res.status(200).json({ message: "logged In successfully" })
})

authRoutes.post('/logout', (req, res) => {
    res.clearCookie("token")

    return res.status(200).json({ message: "logged out successfully" })
})

authRoutes.get('/user', auth, async (req, res) => {
    const userId = req.user.id

    try {
        const user = await userModel.findById(userId)
        if(!user) return res.status(404).json({ message: "User not found" })

        return res.json({ message: `Hello ${user.username}` })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "User not found" })
    }
})

export default authRoutes