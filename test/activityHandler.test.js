/* const { expect } = require('chai'); */
const request = require('supertest');
const server = require('../src/app'); // Reemplaza 'tu_app' con el archivo donde está configurado Express y tus rutas.

const {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  restoreActivity,
} = require('../src/handlers/activitiesHandler');

describe('Activities Controller', () => {
  // Prueba para createActivity
  describe('createActivity', () => {
    it('Crear una nueva actividad', async () => {
      const requestBody = {
        // Coloca aquí los datos de prueba que deseas enviar en el body.
        name: "mario bros",
        description: "actividad entretenida",
        picture: ["https://res.cloudinary.com/dwdosvfpx/image/upload/v1688778408/zqi3ybeaojqcqnwhnvrp.jpg"],
        cost: "3000",
        hours: ["10-11", "11-12", "12-13","13-14","14-15","15-16","16-17","17-18"],
        days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        age: ["Adultos"],
        players: ["2-4","4-8","+8"],
        store: "1"
      };

      const response = await request(server)
        .post('/activities')
        .send(requestBody);

      expect(response.status).toBe(200);
      // Aquí puedes hacer más aserciones sobre la respuesta si es necesario.
    });

    it('Errores en los datos para crear actividad', async () => {
      const requestBody = {
        // Coloca aquí datos de prueba que puedan generar un error en la función.
        
        name: "Futbol",
        description: "actividad entretenida",
        picture: ["https://res.cloudinary.com/dwdosvfpx/image/upload/v1688778408/zqi3ybeaojqcqnwhnvrp.jpg"],
        cost: "3000",
        hours: ["10-11", "11-12", "12-13","13-14","14-15","15-16","16-17","17-18"],
        days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        age: ["Adultos"],
        players: ["2-4","4-8","+8"],
        store: "1"
      };

      const response = await request(server)
        .post('/activities')
        .send(requestBody);

      expect(response.status).toBe(404);
      // Asegúrate de que la respuesta contenga un mensaje de error adecuado.
      expect(response.body).toStrictEqual({error: 'La Actividad ya existe!'});
    });
  });
  
  // Prueba para getActivities
    describe('getActivities', () => {
        it('Obtener todas las actividades', async () => {
        const response = await request(server)
        .get('/activities');

        expect(response.status).toBe(200);
        })
        
        it('Obtener una actividad por nombre', async () =>{
        const response = await request(server)
        .get('/activities/?name=futbol');

        expect(response.status).toBe(200);
        })
        
        it('Error al buscar una actividad por nombre', async () =>{
        const response = await request(server)
        .get('/activities/?name=polo');

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({"error": "Activity not found!"});
        })
    })
    describe('getActivityById', function () {
        it('Obtener una actividad por su id', async () => {
            const response = await request(server)
            .get('/activities/1');

            expect(response.status).toBe(200);
        })
        it('La actividad con el id pasado por params no existe', async () => {
            const response = await request(server)
            .get('/activities/1000')
            
            expect(response.status).toBe(404)
            expect(response.body).toStrictEqual({error: 'Activity not Found'})
        })
    })
    describe('updateActivity', function () {
        it('Modificar una actividad', async () => {
            const requestBody = {
                
                description: "actividad entretenida",
                cost: "3005",
                hours: ["10-11", "11-12", "12-13","13-14","14-15","15-16","16-17","17-18"],
                days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                age: ["Adultos"],
                players: ["2-4","4-8","+8"],
              };

            const response = await request(server)
            .put('/activities/1')
            .send(requestBody)

            expect(response.status).toBe(200)
            expect(response.body).toStrictEqual('Actividad modificada!')
        })
        it('Si la actividad no existe que arroje error', async () => {
            const requestBody = {
                
                description: "actividad entretenida",
                cost: "3000",
                hours: ["10-11", "11-12", "12-13","13-14","14-15","15-16","16-17","17-18"],
                days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                age: ["Adultos"],
                players: ["2-4","4-8","+8"],
              };
            const response = await request(server)
            .put('/activities/1000')
            .send(requestBody)

            expect(response.status).toBe(400)
            expect(response.body).toStrictEqual({"error": "Actividad no encontrada"})
        })
    })

    describe('deleteActivity', function () {
        it('Eliminar una actividad', async () => {
            const response = await request(server)
            .delete('/activities/48')

            expect(response.status).toBe(200)
            expect(response.body).toStrictEqual('Actividad borrada!')
        })
        it('Si la actividad no existe que arroje error', async () => {
            const response = await request(server)
            .delete('/activities/1000')
                   
            expect(response.status).toBe(400)
            expect(response.body).toStrictEqual({"error": 'La actividad no existe!'})
        })
    })
    describe('restoreActivity', function () {
            it('Restaurar una actividad', async () => {
                const response = await request(server)
               .put('/activities/criquet/restore')
               
                expect(response.status).toBe(200)
            })
          
            it('Si la actividad no existe que arroje error', async () => {
              const response = await request(server)
              .put('/activities/tejo/restore')

              expect(response.status).toBe(400)
              expect(response.body).toStrictEqual({"error": "La actividad no existe"})
            })
    })

})