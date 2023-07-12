const { Router } = require("express");
const usersRouter = Router();
const { createUser, deleteUser, updateUser, getUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.put("/", updateUser)
.delete("/:id", deleteUser)
.get("/:id", getUser)


module.exports = usersRouter;