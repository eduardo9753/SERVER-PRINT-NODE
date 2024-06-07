import express from 'express';
const router = express.Router();

// Importa tu controlador
import { homeController } from '../controllers/home.controller.js'; // Cambiado aquí

router.get('/home', homeController.index);

export { router }; // Exporta tu router

