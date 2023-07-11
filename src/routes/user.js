const { Router } = require("express");
const usersRouter = Router();
const { createUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)


module.exports = usersRouter;