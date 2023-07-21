const request = require('supertest');
const server = require('../src/app');

// Simulamos el controlador adminController
jest.mock('../src/controllers/adminController', () => ({
  infoAllAdmin: jest.fn(),
}));

describe('Admin Handler', () => {
  describe('getAllAdmin', () => {
    it('Trae todos los usuarios admins', async () => {
      // Simulamos que la función infoAllAdmin() devuelve un arreglo vacío de administradores
      jest.spyOn(require('../src/controllers/adminController'), 'infoAllAdmin').mockResolvedValue([]);

      const response = await request(server).get('/admin');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('Maneja el error cuando ocurre una excepción', async () => {
      // Simulamos que la función infoAllAdmin() arroja un error
      jest.spyOn(require('../src/controllers/adminController'), 'infoAllAdmin').mockRejectedValue(new Error('Error al obtener los usuarios admins'));

      const response = await request(server).get('/admin');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Error al obtener los usuarios admins' });
    });
  });
});