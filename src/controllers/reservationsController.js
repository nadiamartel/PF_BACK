const { Reservation, User, Activity, Store } = require("../db");

const createReservation = async ({ idUser, idActivity, date, cost, hour }) => {
  const [reservation, created] = await Reservation.findOrCreate({
    where: { date, hour },
    defaults: {
      date,
      hour,
      cost,
      userId: idUser,
      activityId: idActivity,
    },
  });

  if (!created) {
    throw Error("La actividad ya esta reservada en ese horario!");
  }

  return reservation;
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

module.exports = {
  createReservation,
  getAllReservations,
  deleteOneReservation,
  putReservation,
};
