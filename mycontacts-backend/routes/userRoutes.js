const express = require("express")
const validation = require("../middleware/validateTokenHandler")
const router = express.Router();
const {registerUser, loginUser, currentUser} = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login",loginUser)
router.get("/current", validation, currentUser)

module.exports = router
