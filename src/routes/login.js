const { Router } = require("express");
const loginRouter = Router();
const { loginUser } = require("../handlers/loginHandler");

loginRouter
.post("/", loginUser)

module.exports = loginRouter;