const emailer = require("../emailer");

const {
  postUser,
  putUser,
  deleteOneUser,
  infoUserById,
  infoAllUsers,
  restoreUserById,
  getUserName,
} = require("../controllers/usersController");

const createUser = async (req, res) => {
  const { id, name,email, password, phone} = req.body;
  try {
    const response = await postUser({ id, name,email, password, phone });
    emailer.sendMail(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getUserById = await infoUserById(id);
    return res.status(200).json(getUserById);
  } catch (error) {
    return res.status(404).send("No se puedo encontrar el usuario");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteOneUser({ id });

    return res.status(200).json({ message: "Usario eliminado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const { name } = req.body;
    const responseUsers = await infoAllUsers();
    return res.status(200).json(responseUsers);
  } catch (error) {
    return res.status(404).send("Sin acceso a la informacion");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name,  password, phone ,picture} = req.body;

    const response = await putUser({ id, name, password, phone ,picture});

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRestore = await restoreUserById(id);
    return res.status(200).json(userRestore);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getUserByName = async (req, res) => {
  const { name } = req.params;
  try {
    const results = await getUserName(name)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  restoreUser,
  getUserByName,
};
