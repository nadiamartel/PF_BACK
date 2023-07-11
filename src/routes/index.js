const { Router } = require("express");
const router = Router();
const activitiesRouter = require("./activities");
const storeRouter = require("./stores");
const usersRouter = require("./user")
const loginRouter = require("./login")
const reservationsRouter = require("./reservations")
const reviewsRouter = require("./reviews")

router.use("/activities", activitiesRouter);
router.use("/stores", storeRouter);
router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;