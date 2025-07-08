console.log('▶ authRoutes.js cargado a las', new Date().toISOString());

const express = require('express');
const router = express.Router();

// Importa el controlador
const authController = require('../controllers/auth/authController.js');

// Ruta para login
router.post('/login', authController.login);

module.exports = router;
