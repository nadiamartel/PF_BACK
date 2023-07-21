const {postReview} = require('../controllers/reviewsController')

const createReview = async (req, res) => {
    try {
        const {points, description, activityId, userId, reservationId} = req.body

        const newReview = await postReview({points, description, activityId, userId,reservationId})

        return res.status(200).send('Reseña creada!')
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    createReview,
}