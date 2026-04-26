import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const protect = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "No token, unauthorized!" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Token is Invalid" })
        }

        const user = await User.findById(decoded.id);
        req.user = user;

        next()

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }
}

export default protect