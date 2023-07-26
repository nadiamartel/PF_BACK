const { Store } = require("../db");

const postStore = async ({ id, name, address, phone, picture, email, maps }) => {
  const [store, created] = await Store.findOrCreate({
    where: { name },
    defaults: {
      id,
      name: name.toLowerCase(),
      address,
      picture,
      phone,
      email,
      maps,
    },
  });

  if (!created) {
     throw Error( "Store already exists") ;
  }

  return store;
};

const getAllStores = async () => {
  const allStores = await Store.findAll()

  if(!allStores) throw Error('Stores not found!')

  return allStores
}

const deleteStore = async (id) => {
  const found = await Store.findByPk(id);

  if(!found) throw Error('No se encontro la sucursal');

  const deleted = await Store.destroy({
    where: {
      id: id
    },
  });

  return deleted;
}

const restoreStore = async (name) => {

  const store = await Store.restore({where: {name: name.toLowerCase()}});

  if(!store) throw Error('No se encontro la sucursal');

  return store;
}

module.exports = {
  postStore,
  getAllStores,
  deleteStore,
  restoreStore
};
