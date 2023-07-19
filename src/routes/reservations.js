const { Router } = require("express");
const reservationsRouter = Router();
const {
  postReservation,
  getReservations,
  deleteReservation,
  updateReservation,
  getUserByEmail,
} = require("../handlers/reservationsHandler");

reservationsRouter
  .post("/", postReservation)
  .get("/", getReservations)
  .delete("/:id", deleteReservation)
  .put("/:id", updateReservation)
  .get("/:email/email", getUserByEmail);

module.exports = reservationsRouter;
