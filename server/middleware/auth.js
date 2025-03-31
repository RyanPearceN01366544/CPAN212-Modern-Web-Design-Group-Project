import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const generateToken = (user) => {
    // -- Create Token
    return jwt.sign(
        {
            // R: -- Insert User Data into Token --
            userID: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            permissions: user.permissions
        },
        process.env.JWT_SECRET, // R: -- Process Secret --
        { expiresIn: '1d'} // R: -- 
    );
}

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    // R: -- Check Token
    if (!token) {
        return res.status(401).json({message: "Authorization token required"});
    }
    // R: -- Decode
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (error) {
        res.status(400).json({message: "Invalid or expired token"});
    }
};
export default {generateToken, verifyToken};