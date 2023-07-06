const { Router } = require("express");
const router = Router();
const activitiesRouter = require("./activities");
const storeRouter = require("./stores");


router.use("/activities", activitiesRouter);
router.use("/stores", storeRouter)
module.exports = router;
