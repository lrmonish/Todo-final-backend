const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretString = process.env.SECRET_STRING; 

const AuthController = {


  signup: async (req, res) => {
        try {
          const userModel = new UserModel({
            username: req.body.username,
            password: req.body.password, 
          });
    
          const savedUser = await userModel.save();
          res.status(201).json({
            message: 'User created',
            // result: savedUser,
            result: userModel.getPublicProfile()
          });
        } catch (err) {
          if (err.name === 'ValidationError') {
            res.status(300).json({
              message: 'Username already exists',
              details: err.errors,
            });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
        }
      },

login: async (req,res) => {

  try
  {
   const user = await UserModel.findOne({ username: req.body.username });
   
   if (!user) {
             return res.status(401).json({ message: 'User not found' });
           }
          
           const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

           if(!isPasswordValid)
           {
            
             return res.status(401).json({ message: 'Password is incorrect' });
             
           }

           const token = jwt.sign({ username: user.username, userId: user._id }, secretString, { expiresIn: '1h' });
           
           res.setHeader('Authorization', `Bearer ${token}`);
           res.status(201).json({ token: token, expiresIn: 3600 });
  }
  catch (err) {
         return res.status(401).json({ message: 'Error with authentication' });
       }
      
}
 
}

module.exports= AuthController;
