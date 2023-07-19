const { Router } = require("express");
const activitiesRouter = Router();
const {createActivity, getActivities, getActivityById, updateActivity, deleteActivity, restoreActivity} = require ("../handlers/activitiesHandler")

activitiesRouter
.post("/", createActivity)
.get("/", getActivities)
.get('/:id', getActivityById)
.put('/:id', updateActivity)
.delete('/:id', deleteActivity)
.put('/:name/restore', restoreActivity)

module.exports = activitiesRouter;