const { postUser } = require("../controllers/usersController");
const { infoUserById } = require("../controllers/usersController");

const createUser = async (req, res) => {
  const { id, name, email, password, phone } = req.body;
  try {
    const response = await postUser({id, name, email, password, phone});

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

module.exports = {
    createUser,
    getUser
}