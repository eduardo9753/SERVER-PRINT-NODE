// Importa express
import express from 'express';

// Crea un enrutador
const router = express.Router();

// Importa el controlador
import { printController } from '../controllers/print.controller.js';

// Configura la ruta POST /print para el controlador de impresión
router.post('/print', printController.index);

// Exporta el enrutador
export { router };
