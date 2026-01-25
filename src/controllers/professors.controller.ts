import prisma from '../configs/db'; 

export const getProfessors = async (req: any, res: any) => {
    try {
        const professors = await prisma.profesor.findMany();
        // Trae los usuarios vinculados por id_usuario y los combina con cada profesor
        const userIds = professors.map((prof) => prof.id_usuario);

        const users = await prisma.usuario.findMany({
            where: { id_usuario: { in: userIds } },
            select: {
                id_usuario: true,
                nombre: true,
                email: true,
                rol: true,
                cambiarPass: true,
            },
        });

        const userById = new Map(users.map((user) => [user.id_usuario, user]));

        const professorsWithUser = professors.map((prof) => ({
            ...prof,
            ...userById.get(prof.id_usuario) ?? null,
        }));

        res.status(200).json(professorsWithUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching professors', error });
    }
}