const { Router } = require("express");
const usersRouter = Router();
const { createUser, deleteUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.delete("/:id", deleteUser)

module.exports = usersRouter;