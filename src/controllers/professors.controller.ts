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

export const getProfessorById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const professor = await prisma.profesor.findUnique({
            where: { id_profesor: parseInt(id, 10) },
        });
        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }
        const user = await prisma.usuario.findUnique({
            where: { id_usuario: professor.id_usuario },
            select: {
                id_usuario: true,
                nombre: true,
                email: true,
                rol: true,
                cambiarPass: true,
            },
        });
        res.status(200).json({ ...professor, ...user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching professor', error });
    }

}

export const searchProfesor = async (req: any, res: any) => {
    const { email, nombre } = req.params;

    try {

        // Busca por nombre o email en la tabla de usuarios siempre que el rol sea profesor 
   const users = await prisma.usuario.findMany({
            where: {
                ...(email && {
                    email: {
                        contains: email,
                    },
                    ...nombre && {
                        nombre: {
                            contains: nombre,
                        }
                    },
                    rol: "profesor"                    
                }),
            }
        });


    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error searching professors', error });
    }


}