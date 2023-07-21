const { User } = require("../db");

const infoAllAdmin = async() =>{
    const admin = await User.findAll({
      where:{
        client: false,
      }
    })
    if(!admin) throw Error("Sin acceso a la informacion del administrador")
  
    return admin;
  }

module.exports = {
    infoAllAdmin
}