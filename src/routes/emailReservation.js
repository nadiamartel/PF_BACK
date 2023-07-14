const { Router } = require("express");
const emailReservationRouter = Router();
const {postEmailReservation} = require ('../handlers/reservationsHandler');

emailReservationRouter 
.post("/",postEmailReservation);

module.exports = emailReservationRouter