const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization;
    if (authheader && authheader.startsWith("Bearer")) {
        token = authheader.split(" ")[1];
    

        if (!token) {
            return res.status(401).json({ message: "No token, authorization failed." })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            console.log("The decoded user is ", req.user);
            next()
        
        } catch (err) {
            return res.status(400).json({ message: "Token is not valid!" })
        }
    } else {
        return res.status(401).json({message: "No token, authorization denied."})
    }
}

module.exports = verifyToken;