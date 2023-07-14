const { User } = require("../db");

const postLogin = async({email, password}) =>{
      const user = await User.findOne({ where: { email } });
  
      if (!user) throw Error("Usuario no encontrado")
  
      if (user.password !== password) throw Error("Contraseña Invalida")

      return user;
}

module.exports = {
    postLogin
}