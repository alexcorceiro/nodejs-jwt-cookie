const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const router = express.Router()

router.get('/',checkAuth ,(req, res) => {
    console.log(req.user)
    res.json("bienvene sur la route privé")
})



module.exports= router;