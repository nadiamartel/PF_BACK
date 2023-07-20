const request = require('supertest');
const server = require('../src/app')

describe('Reservations Handler', () => {
    describe('Post reservations', () => {
        it('Creacion de reserva con exito', async () => {
            const reservation = {
                date: "Miércoles 25/07/2025",
                hour: "13-16",
                idUser: "1",
                idActivity: "1"
            }
            const response = await request(server)
            .post('/reservations')
            .send(reservation)

            expect(response.status).toBe(200)
        })
        it('Comprobacion de que no falten datos', async () => {
            const reservation = {
                date: "miercoles 25/07/2023",
                hour: "13-15",
                idUser: "1",
                idActivity: "1"
            }
            const response = await request(server)
            .post('/reservations')
            .send(reservation)

            expect(response.status).toBe(400)
            expect(response.body.error).toStrictEqual("Faltan datos")
        })
        it('No existe el usuario con ese Id', async () => {
            const reservation = {
                    date: "miercoles 25/07/2023",
                    cost: 3000,
                    hour: "13-15",
                    idUser: "10004",
                    idActivity: "1"
                
                }

            const response = await request(server)
            .post('/reservations')
            .send(reservation)

            expect(response.status).toBe(400)
            expect(response.body).toStrictEqual({"error": "El usuario no existe"})
        })
        it('No existe la actividad con ese Id', async () => {
            const reservation = {
                    date: "miercoles 25/07/2023",
                    cost: 3000,
                    hour: "13-15",
                    idUser: "1",
                    idActivity: "10323"
                
                }

            const response = await request(server)
            .post('/reservations')
            .send(reservation)

            expect(response.status).toBe(400)
            expect(response.body.error).toStrictEqual('La actividad no existe')
        })
    })
    describe('Get Reservations', () => {
        it('Traer todas las reservas', async () => {
            const response = await request(server)
            .get('/reservations')

            expect(response.status).toBe(200)
        })
        it('No hay reservar realizadas', async () => {
            const response = await request(server)
            .get('/reservations')

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("No hay reservas hechas!")
        })
        it('Traer todas las reservas de un usuario cuando se le pasa un nombre por query', async () => {
            const response = await request(server)
            .get('/reservations?name=mati love')
            
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(1)
        })
        it('No hay reservas', async () => {
            const response = await request(server)
            .get('/reservations?name=robertito')

            expect(response.status).toBe(400)
        })
    })
    describe('Delete reservations', () => {
        it('Eliminar una reservation por Id', async () => {
            const response = await request(server)
            .delete('/reservations/16')

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("Reservacion eliminada exitosamente")
        })
        it('No existe una reservation con esa Id', async () => {
            const response = await request(server)
            .delete('/reservations/1000453')

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("No se encontró la reserva") 
        })
    })
    describe('Put reservations', () => {
        it('Modificar una reservation por Id', async () => {
            const response = await request(server)
           .put('/reservations/17')

           expect(response.status).toBe(200)
           expect(response.body).toStrictEqual('Reserva pagada')
        })
        it('Id incorrecto', async () => {
            const response = await request(server)
            .put('reservations/84927')
            console.log(response);
            expect(response.status).toBe(400)
            expect(response.body.error).toStrictEqual("No se encontró la reserva")
        })
    })
})