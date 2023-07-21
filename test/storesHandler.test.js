const request = require("supertest");
const server = require("../src/app");
const {Store} = require('../src/db');


describe("Store Handler", () => {
  let createdStoreId;
  
  afterEach(async ()=>{
    if (createdStoreId) {
      try {
        // Eliminar la reservación creada durante el test
                await Store.destroy({ where: { id: createdStoreId }, force: true });
            } catch (error) {
                console.error('Error eliminando la reservación:', error);
            }
        }
        jest.restoreAllMocks();
    })
    
  describe("/postStore", () => {
    it("debería crear una nueva tienda exitosamente", async () => {
      const newStore = {
        name: "Tiendita",
        address: "Dirección de Mi Tienda",
        phone: "123456789",
        picture: ["url_de_la_imagen"],
        email: "correo@mitienda.com",
        maps: "url_de_maps",
      };

      const response = await request(server).post("/stores").send(newStore);
      expect(response.status).toBe(200);
      createdStoreId = response.body.id;
      expect(response.body.name).toContain(newStore.name.toLowerCase());
       
    },10000);

    it("debería lanzar un error si la tienda ya existe", async () => {
      const existingStore = {
        name: "cerro",
        address: "Dirección de la Tienda Existente",
        phone: "987654321",
        picture: ["url_de_la_imagen_existente"],
        email: "correo@tiendaexistente.com",
        maps: "url_de_maps_existente",
      };

      await request(server).post("/stores")
      .send(existingStore);

      const response = await request(server)
        .post("/stores")
        .send(existingStore);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Store already exists");
    });
  });

  describe("/getAllStore", () => {
    it("Obtener todas las Stores", async () => {

      const response = await request(server).get("/stores");
      expect(response.status).toBe(200);
    });

    it('deberia lanzar un error si no hay sucursales', async () => {
      // Simulamos que la función findAll() del modelo Store devuelve un arreglo vacío
      Store.findAll.mockResolvedValue([]);

      const response = await request(server).get("/stores");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Stores not found!');
    });
  });

  describe('/deleteStore', () => {

    it('deberia desactivar la store', async () => {

        const response = await request(server)
        .delete('/stores/1')

        expect(response.status).toBe(200);
        expect(response.body).toBe("Sucursal desactivada...");
    })

    it('deberia tirar un error si no existe la store', async () => {
        const response = await request(server)
        .delete('/stores/677676');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('No se encontro la sucursal');
    });
  })

  describe('/restoreStore', () => {

    it('deberia activar la store', async () =>{
        const response = await request(server)
        .put('/stores/cerro/restore');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sucursal activada');
    })
    
    it('deberia tirar un error si no existe la store', async () => {
        const response = await request(server)
       .put('/stores/677676/restore');

       expect(response.status).toBe(404);
       expect(response.body.error).toBe('No se encontro la sucursal');
    })


  })

});


