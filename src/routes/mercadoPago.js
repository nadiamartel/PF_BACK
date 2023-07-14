const { Router } = require('express');
const mercadopagoRouter = Router();
const mercadopago =require('mercadopago') 

mercadopago.configure({
    access_token: 'APP_USR-893648489824668-071214-987e2f3afd2b948e0d582a4f826ce2cf-1421381091',
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