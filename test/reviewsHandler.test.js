const request = require('supertest');
const server = require('../src/app')

describe('Reviews Handler', () => {
    describe('Post Review', () => {
        it('Resaña creada exitosamente', async () => {
            const review = {
                points: 5,
                description: 'Muy buenas canchas',
                activityId: "1",
                userId: "5",
            }
            const response = await request(server)
            .post('/reviews')
            .send(review)
            
            expect(response.status).toBe(200)
            expect(response.text).toBe('Reseña creada!')
        })
        it('Faltan datos en el body', async () => {
            const review = {
                description: 'Muy buenas canchas',
                activityId: 1,
                userId: 5,
            }
            const response = await request(server)
            .post('/reviews')
            .send(review)

            expect(response.status).toBe(400)
            expect(response.body.error).toStrictEqual('Faltan datos')
        })
    })
})