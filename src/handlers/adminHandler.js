const { infoAllAdmin, newPassword } = require("../controllers/adminController")


const getAllAdmin = async(req, res) =>{
    try {
      // const { name } = req.body;
      const responseUsers = await infoAllAdmin();
      return res.status(200).json(responseUsers)
    } catch (error) {
      return res.status(404).json({error: error.message})
    }
  }

  const updateAdmin = async(req, res) =>{
    try {
      const { id } = req.params;
      const { password, client} = req.body;
      const adminUpdate = await newPassword({id, password, client});
      return res.status(200).json(adminUpdate);
    } catch (error) {
      return res.status(404).send("El cambio no se pudo realizar")
    }
  }
  
  module.exports = {
    getAllAdmin,
    updateAdmin
  }