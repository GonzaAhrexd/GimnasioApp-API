import { Router } from 'express';
import { getProfessors } from '../controllers/professors.controller';
import { authRequired } from '../middlewares/validateToken';
const router:Router = Router();

// GET: Obtener todos los profesores
router.get('/', authRequired, getProfessors)


export default router
