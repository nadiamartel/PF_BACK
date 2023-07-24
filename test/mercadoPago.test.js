const request = require('supertest');
const server = require('../src/app')

describe('POST /mercadopago', () => {
    it('debe responder con un status 200 y un id cuando la solicitud es válida', async () => {
      const requestBody = {
        description: 'Producto de prueba',
        price: '100',
        quantity: '2',
      };
  
      // Realiza una solicitud POST a la ruta
      const response = await request(server).post('/create_preference').send(requestBody);
  
      // Asegúrate de que el código de respuesta sea 200
      expect(response.status).toBe(200);
  
      // Asegúrate de que el cuerpo de la respuesta contenga un id
      expect(response.body).toHaveProperty('id');
    });
  
    it('debe responder con un status 400 cuando la solicitud es inválida', async () => {
      const invalidRequestBody = {
        // Proporciona un body inválido o incompleto para provocar un error
        // Puedes modificar o eliminar alguna propiedad para simular diferentes escenarios de error
      };
  
      // Realiza una solicitud POST a la ruta
      const response = await request(server).post('/create_preference').send(invalidRequestBody);
  
      // Asegúrate de que el código de respuesta sea 400
      expect(response.status).toBe(400);
      // Asegúrate de que el cuerpo de la respuesta contenga el mensaje de error
      /* expect(response.body).toHaveProperty('message'); */
    });
  });