const { Router } = require("express");
const activitiesRouter = Router();
const {createActivity, getActivities} = require ("../handlers/activitiesHandler")

activitiesRouter
.post("/", createActivity)
.get("/", getActivities)


module.exports = activitiesRouter;