import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const auth = async (req, res, next) => {
    const token = req.cookies.Token
    if (!token) return res.status(401).json({ message: "Token not Found" })

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.status(400).json({ message: "Invalid Token" })

        const user = await userModel.findById(decoded.id)
        if (!user) { return res.status(403).json({ message: "User does not exist" }) }

        req.user = user
        next()
    } catch (e) {
        console.log("Error - " + e);
        return res.status(401).json({ message: "Invalid Token" })
    }
}

export default auth;