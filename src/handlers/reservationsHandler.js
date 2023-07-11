
const {createReservation, getAllReservations} = require('../controllers/reservationsController')

const postReservation = async (req, res) => {
    const {idUser, idActivity, date, cost, hour} = req.body
    try {
        const reservation = await createReservation({idUser, idActivity, date, cost, hour})

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getReservations = async (req, res) => {
    try {
        const reservations = await getAllReservations()

        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    postReservation,
    getReservations
}