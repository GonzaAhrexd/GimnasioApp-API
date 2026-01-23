import { Router } from 'express';

import { getUser, createUser, editUser, deleteUser, changeRol, advanceSearchUsers } from '../controllers/user.controller';
import { isAdmin } from '../middlewares/validateToken';

const router:Router = Router();


// GET: Get the last ping message
router.get('/', getUser)
// GET: Search user 
router.get('/search', isAdmin, advanceSearchUsers)
// POST: Create a new user
router.post('/', createUser)
// PUT: Edit the last user
router.put('/:id_usuario', editUser)
// DELETE: Delete the last user
router.delete('/:id_usuario', deleteUser)

export default router