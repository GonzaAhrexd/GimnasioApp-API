import { Router } from 'express';

import { getUser, createUser, editUser, deleteUser, changeRol, advanceSearchUsers } from '../controllers/user.controller';
import { isAdmin } from '../middlewares/validateToken';

const router:Router = Router();


// GET: Obtener todos los usuarios
router.get('/', getUser)
// GET: Buscar un usuario
router.get('/search', isAdmin, advanceSearchUsers)
// POST: Crear un nuevo usuario
router.post('/', createUser)
// PUT: Editar el usuario por ID 
router.put('/:id_usuario', editUser)
// DELETE: Eliminar el usuario por ID
router.delete('/:id_usuario', deleteUser)

export default router