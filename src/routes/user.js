const { Router } = require("express");
const usersRouter = Router();
const { createUser, deleteUser, updateUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.put("/", updateUser)
.delete("/:id", deleteUser)



module.exports = usersRouter;