const request = require('supertest');
const server = require('../src/app');

describe('Refund handler', () => {
    describe('Post refund', () => {
        it('Deberia mandar el email correctamente', async () => {
            const post = {
                reservId: "1",
                activity: "1",
                date: "miercoles 02/12/2023",
                cost: "1234",
                hour: "12/13",
                user: "sportiverse",
                store: "cerro"
            }
            const response = await request(server)
            .post('/refund')
            .send(post)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("email enviado")
        })
        it('Deberia devolver un error si no existe el usuario', async () => {
            const post = {
                reservId: "1",
                activity: "1",
                date: "miercoles 02/12/2023",
                cost: "1234",
                hour: "12/13",
                user: "pepito",
                store: "cerro"
            }
            const response = await request(server)
            .post('/refund')
            .send(post)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('No se encontro al usuario')
        })
    })
})