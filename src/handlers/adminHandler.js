const { infoAllAdmin } = require("../controllers/adminController")


const getAllAdmin = async(req, res) =>{
    try {
      // const { name } = req.body;
      const responseUsers = await infoAllAdmin();
      return res.status(200).json(responseUsers)
    } catch (error) {
      return res.status(404).json({error: error.message})
    }
  }
  
  module.exports = {
    getAllAdmin
  }