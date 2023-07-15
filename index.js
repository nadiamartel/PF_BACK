require("dotenv").config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`)) // eslint-disable-line no-console
});