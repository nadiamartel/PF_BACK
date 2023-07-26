const request = require('supertest');
const server = require('../src/app');
const db = require('../src/db');

// Simula las funciones de la base de datos con las mock functions de Jest
jest.mock('../src/db');

describe('Reviews Handler', () => {
    // ... Tus casos de prueba ...

    beforeEach(() => {
        // Limpia todas las llamadas a las mock functions y sus valores de retorno antes de cada prueba
        jest.clearAllMocks();

        // Simula la función createReview del módulo db
        // En este caso, la respuesta simulada será simplemente un mensaje de éxito
        db.createReview = jest.fn().mockResolvedValue('Reseña creada!');
    });

    describe('Post Review', () => {
        it('Reseña creada exitosamente', async () => {
            const review = {
                points: 5,
                description: 'Muy buenas canchas',
                activityId: "1",
                userId: "5",
                reservationId: "2",
            };
            const response = await request(server)
                .post('/reviews')
                .send(review);
            
            expect(response.status).toBe(200);
            expect(response.text).toBe('Reseña creada!');
        });

        it('Faltan datos en el body', async () => {
            const review = {
                description: 'Muy buenas canchas',
                activityId: 1,
                userId: 5,
            };
            const response = await request(server)
                .post('/reviews')
                .send(review);

            expect(response.status).toBe(400);
            expect(response.body.error).toStrictEqual('Faltan datos');
        });
    });
});