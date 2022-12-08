const express = require("express")
const app = express()
const cookieparser = require("cookie-parser")
const cors = require("cors")
const connectDB = require("./db")
const authRoute = require("./router/authRoute")
const { adminAuth, userAuth } = require("./middleware/auth")
const port = 5300


app.use(cookieparser())
app.use(express.json())
app.use(cors())


app.use('/api', authRoute)
app.get("/admin", adminAuth, (req, res) => res.send("admin route"))
app.get("/basic", userAuth, (req, res) => res.send("User route"))


connectDB()

app.listen(port, () => {
    console.log("server a demarer")
})