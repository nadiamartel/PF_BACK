const { Router } = require("express");
const activitiesRouter = Router();
const {createActivity, getActivities, getActivityById} = require ("../handlers/activitiesHandler")

activitiesRouter
.post("/", createActivity)
.get("/", getActivities)
.get('/:id', getActivityById)

module.exports = activitiesRouter;