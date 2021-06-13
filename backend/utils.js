import jwt from 'jsonwebtoken';

export const generateToken = user => {
    const jwtSecret = process.env.JWT_SECRET || 'amazona';
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
    }, jwtSecret, {
        expiresIn: '30d',
    })
}