const jwt = require("jsonwebtoken");
const User = require("./../Models/User");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("Authentication Invalid");
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // const user = User.findById(payload.id).select('-password')
        // req.user = user

        req.user = ({ userId: payload.userId, name: payload.name })
        next();
    } catch (err) {
        console.log(err);
        // throw new Error("Authentication Invalid");
    }
}

module.exports = auth;