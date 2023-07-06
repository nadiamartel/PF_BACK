const { Store } = require("../db");

const postStore = async ({ id, name, address, phone, picture }) => {
  const [store, created] = await Store.findOrCreate({
    where: { name },
    defaults: {
      id,
      name,
      address,
      picture,
      phone,
    },
  });

  if (!created) {
     throw Error( "Store already exists") ;
  }

  return store;
};

module.exports = {
  postStore,
};
