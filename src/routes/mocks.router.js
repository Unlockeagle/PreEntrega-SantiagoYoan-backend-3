import { Router } from "express";
import MocksController from "../controllers/mocks.controller.js";


const router = Router()
// Utilizar este módulo en un endpoint GET llamado “/mockingpets” y generar 100 mascotas con el mismo formato que entregaría una petición de Mongo
router.get('/mockingpets', MocksController.getMockingPets)
router.get('/mockingusers', MocksController.getMockingUser)
//debe ser post pero lo debo cambiar
router.post('/generatedata', MocksController.postMockingData)

export default router


