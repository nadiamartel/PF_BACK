const { postLogin } = require("../controllers/loginController");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await postLogin({ email, password });
  
      if(response) return res.status(200).json({ message: "Registro Exitoso", homeURL: "/home" });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports ={
    loginUser
  }