import { Router } from "express"
import auth from "../middlewares/authMiddleware.js"
import admin from "../middlewares/adminMiddleware.js"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import postModel from "../models/postModel.js"

const authRoutes = Router()

authRoutes.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body
        if (!username) { return res.status(400).json({ message: "Username Required" }) }
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ username, email, password: hashedPassword })
        res.status(201).json({ message: "User registered successfully.", userId: newUser.email })
    }
    catch (error) {
        console.log("Error - " + error);
        res.status(500).json({ message: "Server error.", error: error.message })
    }

})

authRoutes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." })
        }

        const user = await userModel.findOne({ email })

        // Check if user exists 
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." })
        }

        // Check if password is correct for the user
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie("Token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        return res.status(200).json({ message: `Logged in successfully. Welcome ${user.email}`, user })
    }
    catch (error) {
        console.log("Error - " + error);
        return res.status(500).json({ message: "Server error.", error: error.message })
    }
})

authRoutes.get("/user", auth, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate({
            path: "posts",
            populate: {
                path: "comments"
            }
        }).select('-password')
        if (!user) return res.status(404).json({ message: "User not found" })


        return res.status(200).json({ message: `Welcome ${user.email}`, user })
    } catch (e) {
        console.log("Error - " + e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

authRoutes.delete("/logout", (req, res) => {
    res.clearCookie("Token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    })
    res.status(200).json({ message: "logged out successfully" })
})


export default authRoutes