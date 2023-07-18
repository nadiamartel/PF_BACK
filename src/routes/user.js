const { Router } = require("express");
const usersRouter = Router();
const { createUser, deleteUser, updateUser, getUser, getAllUsers, restoreUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.put("/:id", updateUser)
.delete("/:id", deleteUser)
.get("/:id", getUser)
.get("/", getAllUsers) //solo usuarios clientes
.put("/:id/restore", restoreUser)


module.exports = usersRouter;