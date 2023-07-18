const { User, Reservation, Review } = require("../db");

const postUser = async ({ id, name, email, password, phone }) => {
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

  if (!created) throw Error("El usuario ya existe")

  return user;

}

const infoUserById = async (id) => {
  const users = await User.findByPk(id, {
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

  if (!users) throw Error('Usuario no encontrado');

  return users;
}


const deleteOneUser = async ({ id }) => {
  const deleteUser = await User.destroy({
    where: {
      id: id,
    },
  });

  return deleteUser;
};

const infoAllUsers = async() =>{
  const clients = await User.findAll({
    where:{
      client: true,
    }
  })

  return clients;
}

const putUser = async ({ id, name, password, phone }) => {
  if(!id) throw Error("Debe proporcionar un ID para realizar el cambio")

  const userUpdate = await User.findByPk(id);
  console.log(userUpdate);

  if (userUpdate === null) throw Error("Debe ingresar un ID valido");
  if (!userUpdate.client) throw Error("No se puede editar el usuario porque no es un cliente");

  userUpdate.name= name || userUpdate.name;
  userUpdate.password= password || userUpdate.password;
  userUpdate.phone= phone || userUpdate.phone

  await userUpdate?.save();
  console.log(userUpdate);
  return  { message: "Informacion Actualizada!" };
};

module.exports = {
  postUser,
  putUser,
  deleteOneUser,
  infoUserById,
  infoAllUsers
};

