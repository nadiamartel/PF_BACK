const { Router } = require("express");
const activitiesRouter = Router();
const {createActivity, getActivities, getActivityById, updateActivity} = require ("../handlers/activitiesHandler")

activitiesRouter
.post("/", createActivity)
.get("/", getActivities)
.get('/:id', getActivityById)
.put('/:id', updateActivity)

module.exports = activitiesRouter;