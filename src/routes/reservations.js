const { Router } = require("express");
const reservationsRouter = Router();
const {postReservation, getReservations, deleteReservation} = require('../handlers/reservationsHandler')

reservationsRouter
.post('/', postReservation)
.get('/', getReservations)
.delete('/:id', deleteReservation)

module.exports = reservationsRouter;