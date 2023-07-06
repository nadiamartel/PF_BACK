const { postActivity, getActivityByName } = require("../controllers/activitiesController");
const {Activity, Store} = require('../db')
const createActivity = async (req, res) => {
  const { id, name, description, picture, cost, hours, days, store, age, players } = req.body;
  try {
    const response = await postActivity({
      id,
      name,
      description,
      picture,
      cost,
      hours,
      days,
      store,
      age,
      players
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getActivities = async (req, res) => {
  try {
      const {name} = req.query
      const results = name ? await getActivityByName(name) : await Activity.findAll({
          include:{
              model: Store,
              attributes: ['name'],
              through: {
                  attributes: []
              }
          }
      }) 
      results && res.status(200).json(results)
  } catch (error) {
      res.status(500).json({error: error.message})
  }
}


module.exports = {
  createActivity,
  getActivities
};
