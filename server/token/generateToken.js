const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jsonwebtoken.sign({ id }, JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = generateToken;