const {Review} = require('../db')

const postReview = async ({points, description, activityId, userId}) => {

    if (!points ||!description ||!activityId ||!userId) throw Error('Faltan datos')
    
    const createReview = await Review.create({
        points,
        description,
        userId,
        activityId,
    })

    return createReview
}

module.exports = {
    postReview,
}
