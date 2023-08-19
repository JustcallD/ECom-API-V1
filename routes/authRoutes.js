const { registerUser, loginUser } = require("../controllers/authController");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

module.exports = authRouter;
