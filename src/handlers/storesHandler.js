const { postStore, getAllStores, deleteStore,restoreStore } = require("../controllers/storesController");

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

const deleteStores = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteStore(id);

    return res.status(200).json("Sucursal desactivada...");
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

const restoreStores = async (req, res) => {
  try {

    const { name } = req.params;

    const restore = await restoreStore(name);

    res.status(200).json({message:'Sucursal activada'});

  } catch (error) {
    res.status(404).json({error: error.message});
  }
}

module.exports = {
  createStore,
  getStores,
  deleteStores,
  restoreStores
};
