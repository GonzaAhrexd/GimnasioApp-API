import { Router } from 'express';

import { getUser, createUser, editUser, deleteUser } from '../controllers/user.controller';

const router:Router = Router();


// GET: Get the last ping message
router.get('/', getUser)
// POST: Create a new ping message
router.post('/', createUser)
// PUT: Edit the last ping message
router.put('/:id', editUser)
// DELETE: Delete the last ping message
router.delete('/:id', deleteUser)


export default router