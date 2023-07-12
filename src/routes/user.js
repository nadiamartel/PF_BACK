const { Router } = require("express");
const usersRouter = Router();
const { createUser, getUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.get("/:id", getUser)


module.exports = usersRouter;