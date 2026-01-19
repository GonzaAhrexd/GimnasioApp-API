type User = {
    id: number;
    email: string;
    nombre?: string;
    pass: string;
    rol: string;
    cambiarPass: boolean;
}


export default User;