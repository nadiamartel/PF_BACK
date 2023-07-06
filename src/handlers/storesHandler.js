const { postStore } = require("../controllers/storesController");
const createStore = async (req, res) => {
  const { id, name, address, phone, picture } = req.body;
  try {
    const response = await postStore({ id, name, address, phone, picture });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createStore,
};
