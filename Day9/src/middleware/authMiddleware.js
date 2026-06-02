import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(400).json({ message: "Unauthorised" })

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (e) {
        console.log("Error - " + e);
        return res.json({ message: "Invalid token" })
    }
}