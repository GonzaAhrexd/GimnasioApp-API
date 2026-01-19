import { Router } from 'express';

import { getUser, createUser, editUser, deleteUser, changeRol } from '../controllers/user.controller';

const router:Router = Router();


// GET: Get the last ping message
router.get('/', getUser)
// POST: Create a new ping message
router.post('/', createUser)
// PUT: Edit the last ping message
router.put('/:id_usuario', editUser)
// DELETE: Delete the last ping message
router.delete('/:id_usuario', deleteUser)

export default router