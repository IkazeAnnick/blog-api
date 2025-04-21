const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ msg: 'Access is denied' });
        }
        next();
    };
};

export default authorizeRole;
