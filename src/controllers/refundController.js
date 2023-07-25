const { User } = require("../db");
const emailer = require("../emailer");

const postEmailRef = async ({
    reservId,
    activity,
    date,
    hour,
    cost,
    user,
    store,
  }) => {
    const foundUser = await User.findOne({ where: { name: user } });
    if(!foundUser) throw Error('No se encontro al usuario')
    const emailUser = foundUser.email;
    const response = {
      reservId,
      activity,
      date,
      hour,
      cost,
      user,
      store,
      emailUser,
    };
  
    emailer.sendMailRefund(response);
  };

  const postEmailRefAdmin = async ({
    reservId,
    activity,
    date,
    hour,
    cost,
    user,
    store,
    email
  }) => {
    console.log(email);
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
      emailUser,
    };
    console.log(emailUser)
  
    emailer.sendMailRefundAdmin(response);
  };

  module.exports = {
    postEmailRef,
    postEmailRefAdmin
  };