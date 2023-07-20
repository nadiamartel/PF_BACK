const request = require('supertest');
const server = require('../src/app');

describe('Admin Handler', () => {
    describe('getAllAdmin', () => {
        it('Trae todos los usuarios admins', async () => {
            const response = await request(server)
            .get('/admin');

            expect(response.status).toBe(200)
        })
    })
})