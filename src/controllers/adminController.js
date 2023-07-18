const { User } = require("../db");

const infoAllAdmin = async() =>{
    const admin = await User.findAll({
      where:{
        client: false,
      }
    })
  
    return admin;
  }

  module.exports ={
    infoAllAdmin
  }