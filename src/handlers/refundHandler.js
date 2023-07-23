const {postEmailRef} = require("../controllers/refundController");

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

  module.exports = {
    postEmailRefund
  };
