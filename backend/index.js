const express = require('express'); // importa librería 
const app = express(); // crea una instancia de Express, app se usará para configurar rutas y arrancar el servidor
const port = 3000; // puerto de escucha

app.use(express.json()); // para recibir JSON en las peticiones, cada vez que llegue una petición con datos Json, los transforme automáticamente para que pueda usarlos fácilemnte en el código 
/*Define una ruta en el servidor para cuando visite la raíz /, cuando se hace una petición desde el navegador o un HTTP a localhost, esta función 
responde con el texto "Backend corriendi correctamente" */
const apiRoutes = require('./routes/api.js'); //importa rutas
app.use('/api', apiRoutes); // todas las rutas definidas en api.js irán con el prefijo api



// Ruta raíz
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

/* Le dice al servidor que escuche por el puerto 3000, cuando este listo imprime en consola para que sepa que esta funcionando */
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
})