const jwt =require("jsonwebtoken")

exports.checkAuth = (req , res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json('no token foound')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, paylaod) => {
        if(err){
            return res.status(403).json('invalid token')
        }

        req.user = {
            id: paylaod.id
        }
        next()
    })
}