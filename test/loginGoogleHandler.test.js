const request = require('supertest');
const server = require('../src/app');
const {User} = require('../src/db');

describe('Login Google Handler', () => {

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

    describe('Post login google', () => {
        it('Deberia crear correctamente un usuario por google', async () => {
            const login = {
                name: 'rauuuul',
                email: "raul@gmail.com",
                googleId: '105458641516556741172',
            }
            
            const response = await request(server)
            .post('/login/google')
            .send(login)

            expect(response.status).toBe(200)
            createdUserId = response.body.response[0].id;
        })
        it('Deberia crear correctamente un usuario por google', async () => {
            const login = {
                name: 'rauuuul',
                email: "raul@gmail.com",
            }
            
            const response = await request(server)
            .post('/login/google')
            .send(login)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('Faltan datos!')
        })
    })
})