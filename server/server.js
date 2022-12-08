const express = require("express");
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const port = 4200

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const Users = [
    {
        id: "1",
        username: "jhon", 
        password: "123456",
        isAdmin: true
    },
    {
        id: "2",
        username: "jack",
        password: "abcd",
        isAdmin: false
    }
]


app.post("/api/login", (req, res) => {
    const { username, password }= req.body
    const user = Users.find((u) => {
        return u.username === username && u.password === password
    });
    if(user){
        const accesToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin},
            "secretkey",
            { expiresIn: "15m"}
        )

        const refreshToken = jwt.sign(
            {id: user.id, isAdmin: user.isAdmin},
            "refreshsecretkey",
            { expiresIn: "15m"}
        )

        res.json({
            username: user.username , 
            isAdmin: user.isAdmin,
            accesToken
        })

    } else {
        res.status(400).json("username or password incerrect ")
    }
})

const verify = (req, res , next ) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, "secretkey", (err, user) => {
            if(err){
                return res.status(403).json("token id not valid ")
            }

            req.user = user
            next()
        })
    }else{
        res.status(401).json("vous ne pouvez accédez")
    }
}

app.delete("/api/users/:userId", verify, (req, res) => {
    if(req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("user has been deleted")
    } else {
        res.status(403).json("user is not deleted")
    }
})

let refreshtoken = []

app.post("/api/refresh", (req, res) => {
    const refreshtoken = req.body.token

    if(!refreshtoken) return res.status(401).json("you are not authenticated ")
})

app.listen(port, () => {
    console.log("server a demarer")
})