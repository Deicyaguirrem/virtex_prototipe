// Importa la librería MQTT
const mqtt = require('mqtt');

// Configuración del brocker 
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
 // Puerto configurado para que escuche el mosquitto
const MQTT_OPTIONS = {
    clientId: 'edge-server-' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 10001
};

// Creamos y mantenemos la conexión
const client = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

// Eventos para verificar conexión
client.on('connect', () => {
    console.log('✅ Conectado al broker MQTT');
});

client.on('error', (err) => {
     console.error('❌ Error al conectar con MQTT:', err);
});

client.on('reconnect', () => {
    console.log('🔄 Reconectando al broker MQTT...');
});

// Función para publicar mensajes
const publishMessage = (topic, message) => {
    return new Promise((resolve, reject) => {
        client.publish(topic, message, {qos: 1}, (error) => {
            if (error) {
                console.error('❌ Error al publicar mensaje MQTT:', error);
                reject(error);
            } else {
                console.log(`📨 Mensaje publicado en [${topic}]:`, message);
                resolve();
            }
        });
    });
};

// Suscribirse a un topic
const subscribeTopic = (topic, messageHandler) => {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, { qos: 1 }, (error, granted) => {
      if (error) {
        console.error('❌ Error al suscribirse al topic MQTT:', error);
        reject(error);
      } else {
        console.log(`✅ Suscrito al topic: ${topic}`);
        // Evento para recibir mensajes
        client.on('message', (receivedTopic, message) => {
          if (receivedTopic === topic) {
            // mensaje es un Buffer, convertir a string
            messageHandler(message.toString());
          }
        });
        resolve(granted);
      }
    });
  });
};

module.exports = {
  publishMessage,
  subscribeTopic
};