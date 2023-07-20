const {Review} = require('../db')

const postReview = async ({points, description, activityId, userId,reservationId}) => {

    if (!points ||!description ||!activityId ||!userId || !reservationId) throw Error('Faltan datos')
    
    const createReview = await Review.create({
        points,
        description,
        userId,
        activityId,
        reservationId
    })

    return createReview
}

module.exports = {
    postReview,
}
