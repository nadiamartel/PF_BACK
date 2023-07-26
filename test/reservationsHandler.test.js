const request = require('supertest');
const server = require('../src/app')
const {Reservation} = require('../src/db')
const { postEmailReservation,updateReservation } = require('../src/handlers/reservationsHandler')

describe('Reservations Handler', () => {
    
    describe('Get by Email', () => {
        it('Trae todas las reservas de un usuario', async () => {
            const response = await request(server).get('/reservations/luciano.vel166@gmail.com/email');

            expect(response.status).toBe(200)
        },15000)
        it('No se encontraron reservas', async () => {
            const response = await request(server)
            .get('/reservations/gonza@henry.com/email')
            
            expect(response.status).toBe(400)
            expect(response.body.error).toBe("El usuario no tiene reservas hechas")
        })
        it('No existe el usuario', async () => {
            const response = await request(server)
            .get('/reservations/roberto@gmail.com/email')

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('No existe un usuario con ese email')
        })
    })
    describe('Put reservations', () => {            

/*         it('Modificar una reservation por Id', async () => {
           const req = { params: { id: 18 } };
            const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
            };
            await updateReservation(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('Reserva pagada');
            idUpdate = req.params;
        }) */
        it('Id incorrecto', async () => {
            const reservation = {
                
            }
            const response = await request(server)
            .put('/reservations/999',reservation)
            
            expect(response.status).toBe(400)
            expect(response.body.error).toStrictEqual("No se encontró la reserva")
        })
    })
    describe('Post reservations', () => {
        let createdReservationId;

        afterEach(async ()=>{
        if (createdReservationId) {
            try {
                // Eliminar la reservación creada durante el test
                await Reservation.destroy({ where: { id: createdReservationId }, force: true });
            } catch (error) {
                console.error('Error eliminando la reservación:', error);
            }
        }
        }) 
        
        it('Creacion de reserva con exito', async () => {
            const reservation = {
                date: "Miércoles 25/07/2025",
                cost: '353',
                hour: "13-15",
                pay: true,
                idUser: "12",
                idActivity: "78"
            }
            const response = await request(server)
            .post('/reservations')
            .send(reservation)

            expect(response.status).toBe(200)
            createdReservationId = response.body.id;
        },10000)

        it('Comprobacion de que no falten datos', async () => {
            const reservation = {
                date: "miercoles 25/07/2023",
                hour: "13-15",
                idUser: "35",
                pay: true,
                idActivity: "72"
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

        beforeEach(() => {
            // Simular que no hay reservas en la base de datos
            jest.spyOn(Reservation, 'findAll').mockResolvedValue([]);
        });

        it('Traer todas las reservas', async () => {
            const response = await request(server)
            .get('/reservations')

            expect(response.status).toBe(200)
        })

    })
    describe('Delete reservations', () => {

        afterEach( async () => {
            // Restaurar los datos originales después de cada test
            await Reservation.restore({where: { id:22 }});
        });


        it('Eliminar una reservation por Id', async () => {
            const reservation = await Reservation.create({
                    date: "Miércoles 25/07/2012",
                    cost: '355',
                    hour: "13-16",
                    idUser: "1",
                    idActivity: "1"
              });
        
              const deleteReservation = await Reservation.destroy({where: { id: reservation.id }, force: true});
        
              expect(deleteReservation).toBe(1);
            
        })
        it('No existe una reservation con esa Id', async () => {
            const response = await request(server)
            .delete('/reservations/1000453')

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("No se encontró la reserva") 
        })
    })
    describe('Post email reservations',()=>{
        /* it('deberia enviar un email', async () => {
            const req = {
              body: {
                reservId: '282',
                activity: 'jai alai',
                date: 'Miércoles 26/07/2023',
                hour: '10-11',
                cost: 10-11,
                user: 'Nadia Martel',
                store: 'cerro',
                storeAddress: 'belgrano norte 187'
              }
            };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
            await postEmailReservation(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'email enviado' });
          }) */
          it('deberia responder con un status 400 y el mensaje de error correspondiente', async () => {
            // Datos de ejemplo que provocarían el error
            const data = {
            };
        
            // Realiza una solicitud POST a la ruta de la función
            const response = await request(server).post('/emailReservation').send(data);
        
            // Asegúrate de que el código de respuesta sea 400
            expect(response.status).toBe(400);
        
            // Asegúrate de que el cuerpo de la respuesta contenga el mensaje de error proporcionado por la función
            expect(response.body).toHaveProperty('error');
          });
    })
})