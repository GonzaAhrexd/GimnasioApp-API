import prisma from '../configs/db'; // Ruta simple al archivo db.ts
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../types/user'
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt';

dotenv.config();

const SALT_ROUNDS = 10;
const TOKEN_SECRET = process.env.TOKEN_SECRET


function generateSecurePassword(length: number = 8): string {
    const chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=';
    let password: string = '';
    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        // Use the random byte to select a character from the chars string
        password += chars[bytes[i] % chars.length];
    }

    return password;
}

const hashPassword = async (password: string): Promise<string> => {
    console.log(SALT_ROUNDS)
    try{
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    }catch(error){
        console.log(error)
        throw new Error('Error hashing password');
    }
}


export const loginUser = async (req, res) => {
    try {
        // Extrae email y pass del cuerpo de la solicitud
        const { email, pass } = req.body;
        // Busca el usuario en la base de datos por email
        const user = await prisma.usuario.findUnique({
            where: { email: email }
        })

        // Si no encuentra el usuario, devuelve un mensaje de error
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isPassMatched = await bcrypt.compare(pass, user?.pass)
        if (!isPassMatched) return res.status(400).json({ message: 'Contraseña incorrecta' })

        // Si la contraseña no coincide, devuelve un mensaje de error
        const token = await createAccessToken({ id: user.id_usuario, rol: user.rol });
        res.cookie('token', token, {    
            /* Esto puede ser necesario en producción */
            // domain: '.tudominio.com',
            // secure: process.env.NODE_ENV === 'production',
            // httpOnly: true,
            // sameSite: 'none', // Permite el envío entre sitios
            maxAge: 24 * 60 * 60 * 1000       
          });

            // Devuelve el token y los datos del usuario (excluyendo la contraseña)
          return res.json({ token, ...user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }

}


export const logout = async (req, res) => {
    try{
        res.cookie('token', '', {
            expires: new Date(0),
        });
        return res.json({ message: 'Logged out successfully' });

    }   catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }

}

export const test = async (req, res) => {
    return res.json({ message: 'Test route is working' });
}

export const verifyToken = async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'No hay token' })
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })

        const userFound = await prisma.usuario.findUnique({
            where: { id_usuario: Number((user as any).id) }
        });

        if (!userFound) return res.status(401).json({ message: "No autorizado" })

        return res.json({
            user: userFound
        })
    })
}


export const registerUser = async (req, res) => {
    try {

        const autoGeneratePassword = generateSecurePassword(12);
        const hashedPassword = await hashPassword(autoGeneratePassword);

        const newUsuario = await prisma.usuario.create({
            data: {
                ...req.body,
                pass: hashedPassword,
                cambiarPass: true
            }

        });

        if (req.body.rol.toLowerCase() == "cliente") {
            const newCliente = await prisma.cliente.create({
                data: {
                    id_usuario: newUsuario.id_usuario
                }
            });
        }

        if (req.body.rol.toLowerCase() == "profesor") {
            const newProfesor = await prisma.profesor.create({
                data: {
                    id_usuario: newUsuario.id_usuario
                }
            });
        }


        return res.status(201).json({ message: 'User registered successfully', pass: autoGeneratePassword });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }
}


export const changePassUserFirstLogin = async (req, res) => {

    try{
        const { id_usuario } = req.params;
        const { currentPassword, newPassword } = req.body;

        console.log(currentPassword)
        const user = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id_usuario) }
        });

        // Verifica si la contraseña actual es correcta
        const isPassMatched = await bcrypt.compare(currentPassword, user?.pass)
        if (!isPassMatched) return res.status(400).json({ message: 'Contraseña actual incorrecta' })


            
        const hashedNewPassword = await hashPassword(newPassword);
        
        
        await prisma.usuario.update({
            where: { id_usuario: Number(id_usuario) },
            data: {
                pass: hashedNewPassword,
                cambiarPass: false
            }
        });
        
        return res.status(200).json({ message: 'Password changed successfully', user: user });

    }catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }




}

export const resetPassword = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const newSecurePassword = generateSecurePassword(12);
        const hashedNewPassword = await hashPassword(newSecurePassword);

        await prisma.usuario.update({
            where: { id_usuario: Number(id_usuario) },
            data: {
                pass: hashedNewPassword,
                cambiarPass: true
            }
        });


        return res.status(200).json({ message: 'Password reset successfully', newPassword: newSecurePassword });
    }
    catch(error){
        console.log(error)

        throw new Error('Server error');
    }

}