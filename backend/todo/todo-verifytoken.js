const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretString = process.env.SECRET_STRING; 

function verifyToken(req, res, next) {
    
    try {
      const token = req.headers.authorization;

      jwt.verify(token, secretString, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const userInfo = {
            username: decoded.username,
            userId: decoded.userId,
            iat: decoded.iat,
            exp: decoded.exp
          };
        next;
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  module.exports= verifyToken;