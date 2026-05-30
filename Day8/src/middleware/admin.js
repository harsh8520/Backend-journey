
export const isAdmin = (req, res, next) => {
    if(req.body.role != "admin") return res.json({ message: "Admins Only" })
    next()
} 