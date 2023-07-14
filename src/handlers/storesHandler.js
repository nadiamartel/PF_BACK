const { postStore, getAllStores } = require("../controllers/storesController");

const createStore = async (req, res) => {
  const { id, name, address, phone, picture, email, maps } = req.body;
  try {
    const response = await postStore({ id, name, address, phone, picture, email, maps });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getStores = async (req, res) => {
  try {
    const response = await getAllStores()
    return res.status(200).json(response)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

module.exports = {
  createStore,
  getStores,
};
