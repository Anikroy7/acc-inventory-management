const jwt = require('jsonwebtoken');

module.exports.checkLogin = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log(decoded);
        const { username, userID } = decoded;
        req.username = username;
        req.userID = userID;
        next()
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Fobidden access",
            error: "Authorization error"
        })
    }
}
