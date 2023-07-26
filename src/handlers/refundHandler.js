const {postEmailRef, postEmailRefAdmin} = require("../controllers/refundController");

const postEmailRefund = async (req, res) => {
    try {
      const { reservId, activity, date, hour, cost, user, store } =
        req.body;
      const email = await postEmailRef({
        reservId,
        activity,
        date,
        hour,
        cost,
        user,
        store,
       
      });
      return res.status(200).json({ message: "email enviado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  const postEmailRefundAdmin = async (req, res) => {
    try {
      const { reservId, activity, date, hour, cost, user, store } =
        req.body;
      const email1 = await postEmailRefAdmin({
        reservId,
        activity,
        date,
        hour,
        cost,
        user,
        store,
        
      });
      
      return res.status(200).json({ message: "email enviado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    postEmailRefund,
    postEmailRefundAdmin
  };
