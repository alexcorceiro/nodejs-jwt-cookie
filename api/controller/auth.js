const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const jwtSecert = "450f6652012fa233f5a7928634c9407cf6e3b24b98943a8d6f9bc1d42af7ce1dc8d6f6"

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

if(password.length < 6){
    return res.status(400).json({ message: "password les than 6 charaters"})
}

try{
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash,
        })
          .then((user) =>{
            const maxAge = 3 * 60 * 60
            const token = jwt.sign(
                {id: user._id, username, role: user.role},
                jwtSecert, 
                {
                    expiresIn: maxAge,
                }
            )
            res.cookie("jwt", token, {
                httpOnly: true, 
                maxAge: maxAge * 1000
            })
          
            res.status(200).json({
              message: "User successfully created",
               user: user._id ,
            })
        })
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    }catch(err){
        next(err)
    };
}


exports.login = async (req, res, next ) => {
    const { username, password}  = req.bod;

    if(! username || !password){
        return res.status(400).json({
            message: "username or password not present"
        })
    }
    try{
        const user = await User.findOne({ username, password })
    if(!user){
        res.status(401).json({
            message: "login fail",
            error: "user not fount"
        })
    } else {
        bcrypt.compare(password , user.password).then(function (result) {
           if(result){
            const maxAge = 30 * 60 * 60
            const token  = jwt.sign(
                { id: user._id, username, role: user.role},
                jwtSecert,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            })
            res.status(201).json({
                message: "user success logged in",
                user: user._id
            })
           } else {
            res.status(400).json({ message: " not logged"})
           }
        })
    }
    }catch(error){
        res.status(400).json({
            message: "an error occurred",
            error: error.message
        })
    }
}

exports.update = async (req, res, next ) => {
    const { role, id } = req.body;

    if( role && id) {

        if(role === "admin"){

            await User.findById(id)
             .then((user) => {
                if(user.role !== "admin"){
                    user.role = role
                    user.save((err) => {
                        if(err){
                            res
                              .status(400)
                              .json({ message : "an error ocurred", error: err.message})
                              process.exit(1)
                        }
                        res.status(201).json({ message: "update success", user})
                    })
                } else {
                    res.status(400).json({ message: "user is already an admin"})
                }
             })
             .catch((error) => {
                res.status(400).json({message: "an error occured ", error: error.messsage })
             })

        }else{
            res.status(400).json({
                message: "role is not admin"
            })
        }
    } else {
        res.status(400).json({ message: "role or not present "})
    }
}

exports.deleted = async (req, res) => {
    const { id } = req.body
    await User.findById(id)
            .then(user => user.remove())
            .then(user => 
                res.status(201).json({ message : "user deleted", user})
                )
                .catch(error => 
                    res.status(400).json({ message: "error occured", error: error.message}))
}