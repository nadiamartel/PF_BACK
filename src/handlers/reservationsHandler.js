
const {createReservation, getAllReservations, deleteOneReservation} = require('../controllers/reservationsController')

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

const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await deleteOneReservation({ id });
  
      return res.status(200).json({ message: "Reservacion eliminada exitosamente" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
//   const updateReservation = HAY QUE HACERLA Y MODIFICAR EL MODELO RESERVATION

module.exports = {
    postReservation,
    getReservations,
    deleteReservation
}