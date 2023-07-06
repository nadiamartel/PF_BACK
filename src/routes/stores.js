const { Router } = require("express");
const storeRouter = Router();
const {createStore, getStores} = require ("../handlers/storesHandler")

storeRouter
.post("/", createStore)
.get("/", getStores)

module.exports = storeRouter;