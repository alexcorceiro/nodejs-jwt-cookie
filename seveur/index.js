const express = require('express')
const app = express()
const PORT = process.env.PORT || 3400
const cookieParser = require("cookie-parser")
const privateRoute = require("./routes/privateRoute")
const authRoute = require("./routes/authRoute")

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoute)
app.use('/private', privateRoute)

app.listen(PORT, () => {
    console.log("server demarer")
})