const { Router } = require("express");
const usersRouter = Router();
const {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  restoreUser,
  getUserByName,
} = require("../handlers/usersHandler");

usersRouter
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .get("/:id", getUser)
  .get("/", getAllUsers) //solo usuarios clientes
  .put("/:id/restore", restoreUser)
  .get("/:name/name", getUserByName);

module.exports = usersRouter;
