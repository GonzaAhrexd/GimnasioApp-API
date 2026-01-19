
import prisma from '../configs/db'; // Ruta simple al archivo db.ts

export const getUser = async (req: any, res: any) => {
    try {
        const users = await prisma.usuario.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

export const createUser = async (req: any, res: any) => {
    try {
        const newUser = await prisma.usuario.create({
            data: req.body
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const editUser = async (req: any, res: any) => {
    try {
        const { id_usuario } = req.params; 

        console.log(req.body)
        const updatedUser = await prisma.usuario.update({
            where: { id_usuario: Number(id_usuario) }, 
            data: req.body
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

export const changeRol = async (req: any, res: any) => {
    try {
        const { id_usuario } = req.params;
        const { rol } = req.body;
        const updatedUser = await prisma.usuario.update({
            where: { id_usuario: Number(id_usuario) },
            data: { rol }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error changing user role', error });
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        const { id_usuario } = req.params;

        await prisma.usuario.delete({
            where: { id_usuario: Number(id_usuario) }
        });
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

