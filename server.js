const http = require('http');
const hostname = '127.0.0.1'
const port = 5000; // mettons
const server = require('./route.js'); // importer les routes

server.listen(port, hostname, () => {
  console.log('Serveur en exécution sur http://' + hostname + ":" + port + '/');
});