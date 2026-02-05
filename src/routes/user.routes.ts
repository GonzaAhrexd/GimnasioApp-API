import { Router } from 'express';

import { getUser, createUser, editUser, changeRol, advanceSearchUsers, deleteUser } from '../controllers/user.controller';
import { isAdmin } from '../middlewares/validateToken';

const router:Router = Router();

// GET: Obtener todos los usuarios
router.get('/',
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Obtener usuarios'
       #swagger.description = 'Obtiene la lista de todos los usuarios' */
    getUser)

// GET: Buscar un usuario
router.get('/search', isAdmin,
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Búsqueda avanzada'
       #swagger.description = 'Realiza una búsqueda avanzada de usuarios (solo admin)' */
    advanceSearchUsers)

// POST: Crear un nuevo usuario
router.post('/',
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Crear usuario'
       #swagger.description = 'Crea un nuevo usuario en el sistema' */
    createUser)

// PUT: Editar el usuario por ID 
router.put('/:id_usuario',
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Editar usuario'
       #swagger.description = 'Edita un usuario existente por su ID' */
    editUser)

// DELETE: Eliminar el usuario por ID
router.delete('/:id_usuario', 
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Eliminar usuario'
       #swagger.description = 'Elimina un usuario por su ID' */
    deleteUser)
    
export default router