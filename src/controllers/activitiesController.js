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
    return res.status(404).json({ error: "Activity already exists" });
  }

  await activity.addStores(store);

  return activity;
};

module.exports = {
  postActivity,
};
