const request = require("supertest");
const server = require("../src/app");
const {User} = require('../src/db');

describe('Users Handler', () => {

    let createdUserId;

    afterEach(async ()=>{
        if (createdUserId) {
            try {
                await User.destroy({ where: { id: createdUserId }, force: true });
            } catch (error) {
                console.error('Error eliminando el usuario:', error);
            }
        }
    })

    describe('Post User', () => {
         it('Deberia crear correctamente un usuario', async () => {
            const newUser = {
                    id: "10023",
                    name: "mati antunez",
                    email: "mati@antunez.com",
                    password: "pass123",
                    phone: "123456789"
            }

            const response = await request(server)
            .post('/users')
            .send(newUser)

            expect(response.status).toBe(200)
            createdUserId = response.body.id;
         },10000)
         it('Deberia devolver un error cuando ya hay un usuario con el email ingresado', async () => {
            const newUser = {
                id: "121414",
                name: "sportiverse",
                email: "sportiverse@gmail.com",
                password: "pass123",
                phone: "123456789"
            }

            const response = await request(server)
            .post('/users')
            .send(newUser)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("El usuario ya existe")
         })
    })

    describe('Get User by Id', () => {
        it('Trae a un usuario por Id', async () => {
            const response = await request(server)
            .get('/users/1')

            expect(response.status).toBe(200)
        })
        it('Devuelve un error si no existe el usuario', async () => {
            const response = await request(server)
            .get('/users/153253')

            expect(response.status).toBe(404)
            expect(response.text).toBe("No se puedo encontrar el usuario")
        })
    })
    describe('Delete User', () => {
        it('Deberia eliminar exitosamente el usuario', async () => {
            const response = await request(server)
            .delete('/users/13')

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("Usario eliminado exitosamente")
        })
        it('Deberia devolver un error si no encuentra al usuario', async () => {
            const response = await request(server)
            .delete('/users/13832')

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("No se encontro el usuario")
        })
    })
    describe('Get All Users', () => {
        it('Trae todos los usuarios clientes', async () => {
            const response = await request(server)
            .get('/users')

            expect(response.status).toBe(200)
        })
    })
    describe('Put Users', () => {
        it('Deberia modificar exitosamente el usuario', async () => {
            const putUser = {
                phone: "0532532575235"
            }
            const response = await request(server)
            .put('/users/12')
            .send(putUser)

            expect(response.status).toBe(200)
        })
        it('Deberia devolver un error si no encuentra el usuario', async () => {
            const putUser = {
                phone: "0532532575235"
            }
            const response = await request(server)
            .put('/users/1342324')
            .send(putUser)

            expect(response.status).toBe(404)
        })
        it('Deberia devolver un error si no hay Id', async () => {
            const putUser = {
                phone: "0532532575235"
            }
            const response = await request(server)
            .put('/users/a')
            .send(putUser)

            expect(response.status).toBe(404)
            expect(response.body.error).toBe("Debe proporcionar un ID para realizar el cambio");
        })
        it('deberia arrojar un error si el usuario es un administrador', async ()=>{
            const putUser ={
                phone: '343435353'
            }
            const response = await request(server)
            .put('/users/1')
            .send(putUser);

            expect(response.status).toBe(404)
            expect(response.body.error).toBe("No se puede editar el usuario porque no es un cliente");
        })
    })
    describe('Restore User', () => {
        it('Deberia restaurar exitosamente el usuario', async () => {
            const response = await request(server)
            .put('/users/13/restore')

            expect(response.status).toBe(200)
        })
        it('Deberia devolver un error si no encuentra al usuario', async () => {
            const response = await request(server)
            .put('/users/13832/restore')

            expect(response.status).toBe(404)
            expect(response.body.error).toBe("El usuario no existe")
        })
    })
    describe('Get User by Name', () => {
        it('Deberia traer un usuario por nombre', async () => {
            const response = await request(server)
            .get('/users/sportiverse/name')

            expect(response.status).toBe(200)
        })
        it('Deberia devolver un error si no existe el usuario', async () => {
            const response = await request(server)
            .get('/users/15/name')

            expect(response.status).toBe(500)
        })
    })


})