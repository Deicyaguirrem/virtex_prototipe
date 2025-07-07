const { Pool } = require('pg'); // Importa el Pool de pg para manejar conexiones a PostgreSQL

// Configuración de conexión
const pool = new Pool({
  user: 'deicy',
  host: 'timescaledb',  // Ojo: este nombre debe coincidir con el servicio del docker-compose
  database: 'virtex_db', // Nombre de la base de datos 
  password: 'Deicy33677149',  // Pon la misma clave que pusiste en el docker-compose.yml
  port: 5432,
});

// Verifica conexión al iniciar
pool.connect()
  .then(client => {
    console.log('✅ Conexión a TimescaleDB exitosa');
    client.release();
  })
  .catch(err => console.error('❌ Error al conectar a TimescaleDB', err));

module.exports = pool;
