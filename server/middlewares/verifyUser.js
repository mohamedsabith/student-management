import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
    const token = req.header('AuthToken');

    if (!token) {
        return res.status(401).json({ status: false, error: 'Access Denied' });
    }

    try {
        const verify = jwt.verify(token, process.env.ACCESS_JWT_TOKEN);
        req.user = verify;
        next();
    } catch (error) {
        return res.status(400).json({ status: false, error: 'Token Expired' });
    }
};

export default verifyUser;
