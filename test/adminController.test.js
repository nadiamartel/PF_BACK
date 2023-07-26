const request = require('supertest');
const server = require('../src/app'); 
const { infoAllAdmin } = require('../src/controllers/adminController');
const { User } = require('../src/db');

// Simulamos el modelo User para poder realizar pruebas sin acceder a la base de datos real
jest.mock('../src/db', () => ({
  User: {
    findAll: jest.fn(),
  },
}));

describe('AdminController', () => {
  describe('infoAllAdmin', () => {
    it('Devuelve una lista de administradores', async () => {
      // Simulamos que la función findAll() del modelo User devuelve un arreglo de administradores
      const expectedAdmins = [
        { id: 1, username: 'admin1', client: false },
        { id: 2, username: 'admin2', client: false },
      ];
      User.findAll.mockResolvedValue(expectedAdmins);

      const admins = await infoAllAdmin();

      expect(admins).toEqual(expectedAdmins);
    });

    /* it('Devuelve un error cuando no hay administradores', async () => {
      // Simulamos que la función findAll() del modelo User devuelve un arreglo vacío
      User.findAll.mockResolvedValue([]);

      await expect(infoAllAdmin()).rejects.toThrow('Sin acceso a la informacion del administrador');
    }); */

    it('Devuelve un error cuando ocurre un error en la consulta a la base de datos', async () => {
      // Simulamos que la función findAll() del modelo User arroja un error
      User.findAll.mockRejectedValue(new Error('Error en la consulta a la base de datos'));

      await expect(infoAllAdmin()).rejects.toThrow('Error en la consulta a la base de datos');
    });
  });
});