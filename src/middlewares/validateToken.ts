import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = (decoded as any).id;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        console.log(decoded)
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if ((decoded as any).rol !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        next();
    });
};
