const { Router } = require("express");
const storeRouter = Router();
const {createStore} = require ("../handlers/storesHandler")

storeRouter
.post("/", createStore)
.get("/")

module.exports = storeRouter;