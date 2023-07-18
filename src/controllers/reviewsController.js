const {Review} = require('../db')

const postReview = async ({points, description, activityId, userId}) => {
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
