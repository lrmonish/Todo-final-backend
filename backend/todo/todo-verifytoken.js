const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretString = process.env.SECRET_STRING; 

function verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, secretString, (err) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        next;
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  module.exports= verifyToken;