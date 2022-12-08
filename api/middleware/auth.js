const jwt = require("jsonwebtoken")
const jwtSecert = "450f6652012fa233f5a7928634c9407cf6e3b24b98943a8d6f9bc1d42af7ce1dc8d6f6"

exports.adminAuth =  (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecert, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "not authorized"})
            } else {
                if( decodedToken.role !== "admin"){
                    return res.status(401).json({ message: "not authorized"})
                } else {
                    next()
                }
            }
        })
    } else {
        return res
                .status(401)
                .json({ message: "not authorized, token not valid"})
    }
}


exports.userAuth = (req, res, next ) => {
    const token = req.cookie.jwt
    if(token) {
        jwt.verify(token, jwtSecert, (err, decodedToken) => {
            if(err){
                return res.status(401).json({ message: "not authorized"})
            }else{
                if(decodedToken.role !== "Basic"){
                    return res.status(401).json({ message: "not authorized"})
                }else {
                    next()
                }
            }
        })
    }else{
        return res
                .status(401)
                .json({ message : "not authorized, token not available"})
    }
}