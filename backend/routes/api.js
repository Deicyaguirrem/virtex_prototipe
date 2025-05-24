const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando correctamente');
});

module.exports = router;