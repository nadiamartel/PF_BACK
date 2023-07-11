const { Router } = require("express");
const reservationsRouter = Router();
const {postReservation, getReservations} = require('../handlers/reservationsHandler')

reservationsRouter
.post('/', postReservation)
.get('/', getReservations)

module.exports = reservationsRouter;