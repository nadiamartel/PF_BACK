require('dotenv').config();
const { Router } = require('express');
const mercadopagoRouter = Router();
const mercadopago =require('mercadopago') 
const {
  TOKEN_MP
 } = process.env;

mercadopago.configure({
    access_token: TOKEN_MP,
  })

mercadopagoRouter.post('/', (req, res) => {
    let preference = {
        items: [
          {
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
          },
        ],
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          // success: "https://sportiverse-client.onrender.com/success",
          // failure: "https://sportiverse-client.onrender.com/failure",
          pending: "",
        },
        auto_return: "approved",
      };

      mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        res.status(400).json(error.message);
      });
})

module.exports = mercadopagoRouter