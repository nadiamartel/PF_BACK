const { User, Reservation, Review } = require("../db");
const { Op } = require('sequelize');

const postUser = async ({ id, name, email, password, phone, client }) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      id,
      name,
      email,
      password,
      phone,
      client
    },
  });

  if (!created) throw Error("El usuario ya existe");

  return user;
};

const infoUserById = async (id) => {
  const users = await User.findByPk(id, {
    include: [
      {
        model: Reservation,
        include: [
          {
            model: User,
          },
        ],
      },
      {
        model: Review,
        include: [
          {
            model: User,
          },
        ],
      },
    ],
  });

  if (!users) throw Error("Usuario no encontrado");

  return users;
};

const deleteOneUser = async ({ id }) => {
  const found = await User.findByPk(id)

  if(!found) throw Error("No se encontro el usuario")

  const deleteUser = await User.destroy({
    where: {
      id: id,
    },
  });

  return deleteUser;
};

const infoAllUsers = async () => {
  const clients = await User.findAll({
    where: {
      client: true,
    },
  });

  return clients;
};

const putUser = async ({ id, name, password, phone, picture }) => {
  if (!id || isNaN(id)) throw Error("Debe proporcionar un ID para realizar el cambio");

  const userUpdate = await User.findByPk(id);

  if (userUpdate === null) throw Error("Debe ingresar un ID valido");
  if (!userUpdate.client)  throw Error("No se puede editar el usuario porque no es un cliente");

  userUpdate.name = name || userUpdate.name;
  userUpdate.password = password || userUpdate.password;
  userUpdate.phone = phone || userUpdate.phone;
  userUpdate.picture = picture || userUpdate.picture;

  await userUpdate?.save();

  return { message: "Informacion Actualizada!" };
};

const restoreUserById = async (id) => {
  const restoredUser = await User.restore({ where: { id } });

  if (!restoredUser) throw Error("El usuario no existe");

  return restoredUser;
};

const getUserName = async (name) => {
  const userName = await User.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } }
  });

  if (!userName.length) throw Error("Nombre de usuario no encontrado");
  return userName;
};

const banUsers = async () => {
  const usersBan = await User.findAll({paranoid: false})

  const filterUsersBan = await usersBan.filter(user => user.deletedAt !== null)

  if(!filterUsersBan.length) throw Error('No hay usuarios baneados')

  return filterUsersBan
}

module.exports = {
  postUser,
  putUser,
  deleteOneUser,
  infoUserById,
  infoAllUsers,
  restoreUserById,
  getUserName,
  banUsers
};
