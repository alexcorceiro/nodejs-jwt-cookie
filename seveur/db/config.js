const mongoose = require("mongoose")
require("dotenv").config()


const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     }); 
     console.log("db connected")
}