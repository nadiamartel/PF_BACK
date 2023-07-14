const emailer = require ('../emailer') 

const {
  postUser,
  putUser,
  deleteOneUser,
  infoUserById
} = require("../controllers/usersController");

const createUser = async (req, res) => {
  const { id, name, email, password, phone } = req.body;
  try {
    const response = await postUser({ id, name, email, password, phone });
    emailer.sendMail(response)
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getUser = async(req, res) =>{
  const { id } = req.params;
  try {
    const getUserById = await infoUserById(id);
    return res.status(200).json(getUserById)
  } catch (error) {
    return res.status(404).send("No se puedo encontrar el usuario")
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteOneUser({ id });

    return res.status(200).json({ message: "Usario eliminado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, name, email, password, phone } = req.body;

    const response = await putUser({ id, name, email, password, phone });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser
};
