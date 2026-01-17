
import prisma from '../configs/db'; // Ruta simple al archivo db.ts

export const getUser = async (req: any, res: any) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

export const createUser = async (req: any, res: any) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const editUser = async (req: any, res: any) => {
    try {
        const { id } = req.params; 
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) }, 
            data: req.body
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id: Number(id) }
        });
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}