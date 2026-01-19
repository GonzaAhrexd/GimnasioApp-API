import jwt from 'jsonwebtoken'
// Importar la clave secreta desde el archivo config.ts

import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET 
// Crear una función que genere un token de acceso
export function createAccessToken(payload) {
    console.log(TOKEN_SECRET)
    // Retorna una promesa que resuelve un token de acceso
    return new Promise((resolve, reject) => {
        // Firma un token con el payload y la clave secreta
        jwt.sign(
            payload, TOKEN_SECRET,
            {
                // En cuanto expira el token
                expiresIn: 60 * 60 * 24
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })

    })

}