const { Activity } = require("../db");

const createActivity = async (req, res) => {
  const { id, name, description, picture, cost, hours, days } = req.body;
  try {
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
      },
    });

    if (!created) {
      return res.status(404).json({ error: "Activity already exists" });
    }

    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createActivity,
};
