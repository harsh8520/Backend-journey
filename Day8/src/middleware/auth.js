import e from "express";

const auth = (req, res, next) => {
    const isLoggedIn = true

    if (!isLoggedIn) return res.json({ message: "login required" })

    req.user = {
        name: "Harsh",
        role: "admin"
    }
    next()
}

export default auth