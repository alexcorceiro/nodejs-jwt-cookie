const Mongoose = require("mongoose")

const localDB = `url mongoose`

const connectDB = async () => {
    await Mongoose.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  
    })
    console.log("mongodb connected")
}

module.exports = connectDB;

