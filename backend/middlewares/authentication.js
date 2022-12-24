const jwt = require('jsonwebtoken');
require('dotenv').config();
const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, process.env.jwt_code, function (err, decoded) {
        if (err) {
            res.status(400).send({ Error: "Please Login" })
        } else if (decoded) {
            const userID = decoded.userID;
            if (req.method === "POST" || req.url === '/' || req.method === "PATCH" || req.method === "DELETE") {
                req.body.userID = userID;
            }
            next();
        };
    });
}

module.exports = { authentication };