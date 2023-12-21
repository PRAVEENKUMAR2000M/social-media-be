const jwt = require('jsonwebtoken');
const config = require('../utils/config')


const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        // console.log(token)

        if (!token) {
            response.status(404).json({message:"token not found"})
        }

        const getTokenFrom = (req) => {
            const authorization = req.headers.authorization

            if (authorization && authorization.toLowerCase().startsWith('bearer')) {
                return authorization.substring(7)
            }
          
            return null;
        }
        console.log(getTokenFrom (req))
        try {
            jwt.verify(getTokenFrom(req), config.JWT_SECRET, (error, decodedToken) => {
                if (error) {
                    return response.status(404).json({ message: "token in valid" });
                }

                req.userId = decodedToken.id;
                console.log(req.userId)
                next();
                 
             })
        } catch (error) {
            console.log('inside')
            return res.status(500).json({message:"token is invalid"})
        }
    }
}

module.exports = authMiddleware;