const { Router } = require("express");
const usersRouter = Router();
const { createUser,updateUser } = require("../handlers/usersHandler");

usersRouter
.post("/", createUser)
.put("/", updateUser);


module.exports = usersRouter;