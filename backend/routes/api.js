console.log('▶ api.js cargado a las', new Date().toISOString());
// Contiene las rutas o endpoints
const express = require('express');
const router = express.Router();
// importo el archivo controlador que tiene la logica 
const commandController = require('../controllers/commandController.js');

router.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

router.get('/status', commandController.status);

// ruta para publicar MQTT
router.post('/publishMqtt', commandController.publishMqtt);


// ruta para suscribir en un topic
router.post('/susbscribeMqtt', commandController.subscribeToTopic);

// ruta de prueba para obtener datos de la base de datos
router.get('/test-db', commandController.testDbConnection);


module.exports = router;
