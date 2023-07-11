const { Router } = require('express');
const mercadopagoRouter = Router();
const mercadopago =require('mercadopago') 

mercadopago.configure({
    access_token: 'TEST-7828015077473810-070813-2f51e9ccd2270ffaa4e2b53e77c96251-1417786045',
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
          success: "http://localhost:3000",
          failure: "http://localhost:3000",
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