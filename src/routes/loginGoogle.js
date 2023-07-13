const { Router } = require("express");
const loginGoogleRouter = Router();
const { loginGoogle } = require("../handlers/loginGoogleHandler");

loginGoogleRouter
.post("/", loginGoogle)

module.exports = loginGoogleRouter;