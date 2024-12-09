const express = require("express");
const { signIn, signUp, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logout);

module.exports = router;
