const { Reservation, User, Activity, Store } = require("../db");
const emailer = require("../emailer");
const { Op } = require("sequelize");

const createReservation = async ({ idUser, idActivity, date, cost, hour }) => {
  const userFound = await User.findByPk(idUser)

  if (!userFound) throw Error('El usuario no existe')

  const activityFound = await Activity.findByPk(idActivity)

  if (!activityFound) throw Error('La actividad no existe')

  if(!idUser || !idActivity || !date || !cost || !hour) throw Error('Faltan datos')

  const newReservation = await Reservation.create({
    date,
    hour,
    cost,
    userId: idUser,
    activityId: idActivity,
  });

  return newReservation;
};

const getAllReservations = async () => {
  const findReservations = await Reservation.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "phone"],
      },
      {
        model: Activity,
        include: [
          {
            model: Store,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });

  if (!findReservations) {
    throw Error("No hay reservas hechas!");
  }

  return findReservations;
};

const deleteOneReservation = async ({ id }) => {
  const reservation = await Reservation.findByPk(id);

  if (!reservation) throw Error("No se encontró la reserva");

  const deleteReservation = await Reservation.destroy({
    where: {
      id,
    },
  });

  return deleteReservation;
};

const putReservation = async ({ id }) => {
  const findReserv = await Reservation.findByPk(id);

  if (!findReserv) throw Error("No se encontró la reserva");

  const reservPut = await findReserv.update({
    pay: true,
  });

  return reservPut;
};
const postEmail = async ({
  reservId,
  activity,
  date,
  hour,
  cost,
  user,
  store,
  storeAddress,
}) => {
  console.log(user);
  const foundUser = await User.findOne({ where: { name: user } });
  const emailUser = foundUser.email;
  const response = {
    reservId,
    activity,
    date,
    hour,
    cost,
    user,
    store,
    storeAddress,
    emailUser,
  };

  emailer.sendMailReservation(response);
};

const getByName = async (name) => {
  const response = await getAllReservations();

  const filterReservations = await response.filter((element) =>
    element.user.name.toLowerCase().includes(name.toLowerCase())
  );
  console.log(filterReservations);
   if(filterReservations.length < 1) throw Error('No se encontro el nombre');

  return filterReservations;
};

module.exports = {
  createReservation,
  getAllReservations,
  deleteOneReservation,
  putReservation,
  postEmail,
  getByName
};
