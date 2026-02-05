import { Router } from 'express';
import { getProfessors } from '../controllers/professors.controller';
import { authRequired } from '../middlewares/validateToken';
const router:Router = Router();

// GET: Obtener todos los profesores
router.get('/', authRequired,
    /* #swagger.tags = ['Profesores']
       #swagger.summary = 'Obtener profesores'
       #swagger.description = 'Obtiene la lista de todos los profesores' */
    getProfessors)


export default router
