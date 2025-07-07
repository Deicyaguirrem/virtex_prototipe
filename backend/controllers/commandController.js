// En este archivo se crea la lógica es decir las funciones o acciones de lo que se debe hacer en cada ruta

// Importa el archivo de la carpeta services que contiene logica del negocio
const mqttService = require('../services/mqttService.js');

exports.status = (req, res) => {
  res.send('estado ok');
}
//se crea una función asíncrona llamada sendCommand y se exporta como parte del objeto exports para que otas partes de la app puedan llamarla
// recibe 2 paramétros de express req(request): objeto con toda la información de la petición HTTP
// y res(response): objeto para enviar de vuelta la respusta al cliente
exports.publishMqtt = async (req, res) => {
  try {
    const { topic, message } = req.body;

    // validación para asegurarsee que el cliente envión tanto el topic como el message en el cuerpo de la HTTP
    if (!topic || !message) {
        // Si alguno de estos valores no existe envia status 400 = peticion incorrecta
      return res.status(400).json({ error: 'El topic y el mensaje son requeridos.' });
    }

    // Llamamos al servicio que publica por MQTT que esta en ../services/mqttServices.js
    await mqttService.publishMessage(topic, message);

    // Si la petición es exitosa responde con un status 200 de exito
    res.status(200).json({ success: true, message: 'Comando enviado correctamente.' });
  // Si cualquier línea dentro del bloque try falla, se ejecuta el catch
} catch (error) {
    // El servidor responder con un status 500, diciendo que hubo un error en el servidor
    console.error('Error al enviar comando:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Función para suscribirse a un topic MQTT
exports.subscribeToTopic = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'El topic es requerido para suscribirse.' });
    }

    await mqttService.subscribeTopic(topic, (message) => {
      console.log(`Mensaje recibido en topic [${topic}]:`, message);
    });

    res.status(200).json({ success: true, message: `Suscrito al topic: ${topic}` });
  } catch (error) {
    console.error('Error al suscribirse:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Funcion para probar conexion a la DB viertex_db
const db = require('../config/db'); // importa conexión

exports.testDbConnection = async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).json({ success: true, serverTime: result.rows[0].now });
  } catch (error) {
    console.error('❌ Error en testDbConnection:', error);
    res.status(500).json({ success: false, error: 'No se pudo consultar la DB' });
  }
};
