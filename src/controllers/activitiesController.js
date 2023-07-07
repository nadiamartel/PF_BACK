const { Activity, Store, Reservation,Review,User } = require("../db");

const postActivity = async ({
  id,
  name,
  description,
  picture,
  cost,
  hours,
  days,
  store,
  age,
  players,
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
      age,
      players,
    },
  });

  if (!created) {
    throw Error("Activity already exists");
  }
  
  await activity.addStores(store);

  return activity;
};

const getActivityByName = async (name) => {
  try {
    const activity = await Activity.findAll({ where: { name: name } });
    if (!activity) throw Error("Activity not found!");
    return activity;
  } catch (error) {
    throw Error(error.message);
  }
};

const getDetail = async (id) => {
  const found = await Activity.findByPk(id, {
    include: [
      {
        model: Store,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Reservation,
        include: [
          {
            model: User,
          },
        ],
      },
      {
        model: Review,
        include: [
          {
            model: User,
          },
        ],
      },
    ],
  });

  if(!found) throw Error('Activity not Found');

  return found;
};

module.exports = {
  postActivity,
  getActivityByName,
  getDetail,
};
