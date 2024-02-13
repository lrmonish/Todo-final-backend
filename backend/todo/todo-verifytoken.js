const jwt = require('jsonwebtoken');
require('dotenv').config();
const user = require('../models/user-model');
const secretString = process.env.SECRET_STRING;

async function verifyToken(req, res, next) {
   const token = req.headers.authorization;
  
  if (!token) {
    return res.status(500).json({message:"no token"});
  }
  try{
    const decoded =await jwt.verify(token, secretString,);
    
    const User =await user.findOne({ username: decoded.username })

       

    if(decoded.username === User.username )
    {
      req.user=User;
      return { val:true};
    }
   else{
    res.status(500)
    return {val:false, message:"auth is declined"}
   }
  }
  catch{
    return res.status(500).json({message:"something wrong"});
  }
  
}


module.exports = verifyToken;
