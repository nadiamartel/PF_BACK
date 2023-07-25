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

  const newPassword = async ({ id, password }) => {
    const admin = await User.findAll({
      where: {
        client: false,
      }
    })
    if (admin) {
      const newPassword = await User.findByPk(id);
      newPassword.password = password || newPassword.password;
      await newPassword?.save();
  
      return { message: "Informacion Actualizada!" };
    } else throw Error("Sin acceso")
  
  }

module.exports = {
    infoAllAdmin,
    newPassword
}