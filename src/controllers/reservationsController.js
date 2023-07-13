const { Error } = require('sequelize');
const { Reservation, User, Activity } = require('../db')

const createReservation = async ({idUser, idActivity, date, cost, hour}) => {
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
            throw Error('La actividad ya esta reservada en ese horario!')
        }
    
        return reservation;
   
}

const getAllReservations = async () => {
    const findReservations = await Reservation.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "phone"],
          },
          {
            model: Activity,
          },
        ],
      });

    if(!findReservations){
        throw Error('No hay reservas hechas!')
    }
    
    return findReservations; 
}

const deleteOneReservation = async ({ id }) => {
  const deleteReservation = await Reservation.destroy({
    where: {
      id,
    },
  });

  return deleteReservation;
};

module.exports = {
    createReservation,
    getAllReservations,
    deleteOneReservation
}