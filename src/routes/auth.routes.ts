import  { Router } from 'express';

import { verifyToken, loginUser, registerUser, logout, test, changePassUserFirstLogin, resetPassword } from '../controllers/auth.controller'; 
import { authRequired, isAdmin } from '../middlewares/validateToken';


const router:Router = Router();

// POST: Login a user
router.post('/login', loginUser)
// POST: Register a new user
router.post('/register', registerUser)
// PUT: Change password on first login
router.put('/change-pass/:id_usuario', authRequired, changePassUserFirstLogin)
// PUT: Reset password
router.put('/reset-password/:id_usuario',  isAdmin, resetPassword)
// GET: Logout a user 
router.get('/logout', logout)
// GET: Verify token
router.get('/test', isAdmin  , test)


export default router;