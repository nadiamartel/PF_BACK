const { Activity } = require("../db");

const postActivity = async ({
  id,
  name,
  description,
  picture,
  cost,
  hours,
  days,
  store,
}) => {
  const [activity, created] = await Activity.findOrCreate({
    where: { name },
    defaults: {
      id,
      name,
      description,
      picture,
      cost,
      hours,
      days,
      store,
    },
  });

  if (!created) {
    throw Error( "Activity already exists") ;
  }

  await activity.addStores(store);

  return activity;
};

const getActivityByName = async (name) => {
  try {
      const activity =  await Activity.findAll({where: { name: name}})
      if(!activity) throw Error('Activity not found!')
      return activity
  } catch (error) {
      throw Error(error.message)
  }
}


module.exports = {
  postActivity,
  getActivityByName

};
