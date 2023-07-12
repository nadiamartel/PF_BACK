const { User, Reservation, Review } = require("../db");

const postUser = async({id, name, email, password, phone}) => {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        id,
        name,
        email,
        password,
        phone
      },
    });
    
    if (!created) throw Error("El usuario no existe")
    
   return user;

}

const infoUserById = async(id) =>{
  const users =  await User.findByPk(id, {
    include: [
      {
        model: Reservation,
        include: [
          {
            model: User
          },
        ]
      },
      {
        model: Review,
        include: [
          {
            model: User
          },
        ]
      }

    ]
  });

  if(!users) throw Error('Usuario no encontrado');

  return users;
}



module.exports={
    postUser,
    infoUserById
}
