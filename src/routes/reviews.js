const { Router } = require("express");
const reviewsRouter = Router();
const {createReview} = require ("../handlers/reviewsHandler")

reviewsRouter
.post('/', createReview)

module.exports = reviewsRouter;