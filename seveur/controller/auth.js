const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async(req, res, next) => {
try{
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10)
        const hasedPassword = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
             username: req.body.username,
             password: hasedPassword
        })

        await newUser.save()
        res.status(201).json("new user created")
    } else {
        res.status(403).json("please provide a password")
    }
}catch(err){
    res.status(500).json(err.message)
}
}

exports.login = async(req, res, next) => {
    try{
      const user = await User.findOne({
        username: req.body.username
      })
      if(!user){
        return res.status(404).json("no user found")
      }
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
      if(!isPasswordCorrect){
        return res.status(400).json('wrong password')
      }

      const paylaod = {
        id: user._id
      }
       
      const token= jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: "1d"})
      res.cookie('access_token', token, {
        httpOnly: true
      }).status(200).json({
        username: user.username
      })

    }catch(err){
       res.status(500).json(err.message)
    }
}


exports.logout = (req, res, next) => {
    req.clearCookie('access_token')
    res.status(200).json('logout success')
}