import Jwt from 'jsonwebtoken';
import "dotenv/config";

export const generateAccessToken = (email, username, id) =>
    Jwt.sign(
        {
            email: email,
            name: username,
            id: id,
            data: Date.now(),
            status: 'Ok',
        },
        process.env.ACCESS_JWT_TOKEN,
        { expiresIn: '2d' }
    );

export const generateRefreshToken = (email, username, id) =>
    Jwt.sign(
        {
            email: email,
            name: username,
            id: id,
            data: Date.now(),
            status: 'Ok',
        },
        process.env.REFRESH_JWT_TOKEN,
        { expiresIn: '5d' }
    );
