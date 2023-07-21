const request = require('supertest');
const server = require('../src/app');
const db = require('../src/db');

// Simula las funciones de la base de datos con las mock functions de Jest

describe('Login Handler', () => {

    describe('Post Login', () => {
        it('Login creado exitosamente', async () => {
            const login = {
                email: "sportiverse@gmail.com",
                password: '1234567',
            };
            const response = await request(server)
                .post('/login')
                .send(login);
            
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Registro Exitoso");
            expect(response.body.homeURL).toBe("/home");
            expect(response.body.user).toBe(response.body.user);

        });

        it('Devuelve un error si el usuario no existe', async () => {
            const login = {
                email: "roberto@gmail.com",
                password: '1234567',
            };
            const response = await request(server)
                .post('/login')
                .send(login);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe("Usuario no encontrado");
        });
        it('Devuelve un error si el usuario no existe', async () => {
            const login = {
                email: "sportiverse@gmail.com",
                password: '1234567error',
            };
            const response = await request(server)
                .post('/login')
                .send(login);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe("Contraseña Invalida");
        });
    });
});