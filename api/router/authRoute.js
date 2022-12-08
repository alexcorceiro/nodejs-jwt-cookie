const express = require("express");
const { register, login, update, deleted } = require("../controller/auth");
const { adminAuth } = require("../middleware/auth");
const router = express.Router()


router.post("/register", register);
router.post("/login", login)
router.put("/update", update, adminAuth)
router.delete("/delete", deleted, adminAuth)






module.exports = router;