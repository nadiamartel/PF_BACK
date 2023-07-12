const postUser = async ({ id, name, email, password, phone }) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      id,
      name,
      email,
      password,
      phone,
    },
  });

  if (!created) throw Error("El usuario no existe");

  return user;
};

const deleteOneUser = async ({ id }) => {
  const deleteUser = await User.destroy({
    where: {
      id: id,
    },
  });

  return deleteUser;
};

const putUser = async ({ id, name, email, password, phone }) => {
  const user = await User.findByPk(id);

  if (!user) throw Error("El usuario no existe");

  const newUpdate = user.update(
    { name, email, password, phone },
    { where: { id: id } }
  );

  return newUpdate;
};

module.exports = {
  postUser,
  putUser,
  deleteOneUser,
};
