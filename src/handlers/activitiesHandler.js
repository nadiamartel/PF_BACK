const { postActivity, getActivityByName, getDetail, putActivity, deleteOneActivity, restoreOneActivity } = require("../controllers/activitiesController");
const {Activity, Store} = require('../db')
const createActivity = async (req, res) => {
  const { id, name, description, picture, cost, hours, days, store, age, players } = req.body;
  const storeId = Number(store)
  try {
    const response = await postActivity({
      id,
      name,
      description,
      picture,
      cost,
      hours,
      days,
      store: storeId,
      age,
      players
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
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
      results.length && res.status(200).json(results)
  } catch (error) {
      return res.status(404).json({error: error.message})
  }
}

const getActivityById = async (req,res) =>{
  try {
    const { id } = req.params;
    const detail = await getDetail(id);

    return res.status(200).json(detail);
  } catch (error) {
    
    return res.status(404).json({error:error.message});
  }
}

const updateActivity = async (req, res) => {
  try {
    const {id} = req.params
    const {description, cost, hours, days, players, age} = req.body

    const editActivity = await putActivity({id, description, cost, hours, days, players, age})

    return res.status(200).json('Actividad modificada!')
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

const deleteActivity = async (req, res) => {
  try {
    const {id} = req.params
    const deleteAct = await deleteOneActivity(id)

    return res.status(200).json('Actividad borrada!')
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

const restoreActivity = async (req, res) =>{
  try {
    const {name} = req.params

    const restoreAct = await restoreOneActivity(name)

    return res.status(200).json('Actividad restaurada!')
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  restoreActivity
};
