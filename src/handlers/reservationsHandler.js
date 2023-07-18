const emailer = require('../emailer')


const { createReservation, getAllReservations, deleteOneReservation, putReservation, postEmail,getByName } = require('../controllers/reservationsController')

const postReservation = async (req, res) => {
    const { idUser, idActivity, date, cost, hour } = req.body
    try {
        const reservation = await createReservation({ idUser, idActivity, date, cost, hour })

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getReservations = async (req, res) => {
    try {
        const { name } = req.query;

        const result = name ? await getByName(name) : await getAllReservations();

        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
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

const updateReservation = async (req, res) => {
    const { id } = req.params
    try {
        await putReservation({ id })

        return res.status(200).json('Reserva pagada')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const postEmailReservation = async (req, res) => {
    try {
        const { reservId, activity, date, hour, cost, user, store, storeAddress } = req.body
        const email = await postEmail({reservId, activity, date, hour, cost, user, store, storeAddress});
        return res.status(200).json({ message: 'email enviado' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports = {
    postReservation,
    getReservations,
    deleteReservation,
    updateReservation,
    postEmailReservation,
}