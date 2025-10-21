import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'توکن یافت نشد یا فرمت اشتباه است.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده است.' });
    }
}

export default authMiddleware;
