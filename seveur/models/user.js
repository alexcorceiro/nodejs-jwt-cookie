const mongoose = require("mongoose")


const UserSchma = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password  :{
        type: String,
        required: true 
    }
})

const User = mongoose.model("user", UserSchma)
module.exports = User
