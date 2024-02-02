const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const Todo = require('../todo/todo-schema');
const verifyToken = require('../todo/todo-verifytoken');
const userModel = require('./user-model');
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
      
},

deleteUser: async (req, res)=>
{
  try
  {
    const temp= await verifyToken(req, res); 
    if(temp.val)

    {
      
       const user = await  req.user._id;  
       let pass = req.params.id;
      pass = pass.toString()
        
       const storedPassword = req.user.password;
       
       if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

    const bcryptPass = await bcrypt.compare(pass, storedPassword)
   
      if (bcryptPass) { 
      
        await Todo.deleteMany({ owner:user});
        await userModel.findByIdAndDelete(user)
        
        res.json({ message: 'User deleted successfully' });
        
        
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
     }
  }
  catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
  
}
}

module.exports= AuthController;
