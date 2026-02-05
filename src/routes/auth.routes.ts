import  { Router } from 'express';

import { verifyToken, loginUser, registerUser, logout, test, changePassUserFirstLogin, resetPassword } from '../controllers/auth.controller'; 
import { authRequired, isAdmin } from '../middlewares/validateToken';


const router:Router = Router();

// POST: Login a user
router.post('/login',
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Iniciar sesión'
       #swagger.description = 'Autentica un usuario y devuelve un token' */
    loginUser)

// POST: Register a new user
router.post('/register',
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Registrar usuario'
       #swagger.description = 'Registra un nuevo usuario en el sistema' */
    registerUser)

// PUT: Change password on first login
router.put('/change-pass/:id_usuario', authRequired,
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Cambiar contraseña (primer login)'
       #swagger.description = 'Permite cambiar la contraseña en el primer inicio de sesión' */
    changePassUserFirstLogin)

// PUT: Reset password
router.put('/reset-password/:id_usuario', isAdmin,
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Restablecer contraseña'
       #swagger.description = 'Restablece la contraseña de un usuario (solo admin)' */
    resetPassword)

// GET: Logout a user 
router.get('/logout',
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Cerrar sesión'
       #swagger.description = 'Cierra la sesión del usuario actual' */
    logout)

// GET: Verify token
router.get('/test', isAdmin,
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Test de autenticación'
       #swagger.description = 'Endpoint de prueba para verificar autenticación admin' */
    test)


export default router;