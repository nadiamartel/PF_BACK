const { User } = require("../db");

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

const deleteOneUser = async ({id}) => {
  const deleteUser = await User.destroy({
    where: {
      id: id,
    },
  });

  return deleteUser;
};

module.exports = {
  postUser,
  deleteOneUser,
};
