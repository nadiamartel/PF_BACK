const { Router } = require("express");
const router = Router();
const activitiesRouter = require("./activities");

router.use("/activities", activitiesRouter);

module.exports = router;
