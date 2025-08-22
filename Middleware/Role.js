const ROLES = {
    admin: 'ادمین',
    customer: 'مشتری'
};

function roleMiddleware(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'شما اجازه دسترسی به این بخش را ندارید.' });
        }
        next();
    };
}

export { roleMiddleware, ROLES };
