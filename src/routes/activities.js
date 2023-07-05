const { Router } = require("express");
const activitiesRouter = Router();
const {createActivity} = require ("../handlers/activitiesHandler")

activitiesRouter
.post("/", createActivity)
.get("/")

module.exports = activitiesRouter;