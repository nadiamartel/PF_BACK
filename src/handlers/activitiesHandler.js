const { postActivity } = require("../controllers/activitiesController");

const createActivity = async (req, res) => {
  const { id, name, description, picture, cost, hours, days, store } = req.body;
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
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createActivity,
};
