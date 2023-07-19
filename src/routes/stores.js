const { Router } = require("express");
const storeRouter = Router();
const {createStore, getStores, deleteStores,restoreStores} = require ("../handlers/storesHandler")

storeRouter
.post("/", createStore)
.get("/", getStores)
.delete("/:id", deleteStores)
.put("/:name/restore", restoreStores);

module.exports = storeRouter;