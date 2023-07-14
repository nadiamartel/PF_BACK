const { Router } = require("express");
const reservationsRouter = Router();
const {postReservation, getReservations, deleteReservation, updateReservation} = require('../handlers/reservationsHandler')

reservationsRouter
.post('/', postReservation)
.get('/', getReservations)
.delete('/:id', deleteReservation)
.put('/:id', updateReservation)

module.exports = reservationsRouter;