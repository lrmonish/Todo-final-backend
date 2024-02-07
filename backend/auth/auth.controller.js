const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const Todo = require('../todo/todo-schema');
const verifyToken = require('../todo/todo-verifytoken');
const userModel = require('./user-model');
require('dotenv').config(); 

const secretString = process.env.SECRET_STRING; 
let role;
const adminkey = process.env.adminkey;


const AuthController = {


  signup: async (req, res) => {

    let rolegiven = "user";
        
    if(req.body.adminkey == adminkey)
    {
            rolegiven = 'admin';
    }
    try {
          const userModel = new UserModel({
            username: req.body.username,
            password: req.body.password, 
            role:rolegiven
            
          });
          
    
          const savedUser = await userModel.save();
          res.status(201).json({
            message: 'User created',
            result: userModel.getPublicProfile()
          });
        } 
        
        catch (err) {
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
          let username =  req.body.username
           res.setHeader('Authorization', `Bearer ${token}`, 'username', `username ${username}`);
           res.setHeader( 'username', `${username}`);

           res.status(201).json({ token: token, expiresIn: 3600, user:user.role});
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
  
},

getallusers: async(req,res)=>
{
   try{

    let users = await userModel.find({role:"user"});
    let user = await users;
    // await delete userObject.role;
   return  res.json(users);
 

   }catch
   {
    
    res.status(500).json({ error: 'Failed to get user' });
   }
  



},

deleteuserbyadmin : async(req, res)=>
{
  try
  {
    const deletedTodo = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ message: "user not found" });
    return res.json({ message: "user deleted successfully" });
  
  }catch
  {

    return res.status(500).json({ error: 'Failed to delete user' });
  }


},

edituserbyadmin : async(req, res)=>
{
  try
  {
    const updatedDescription = req.body.username; 
          const id = req.params.id;
           console.log(updatedDescription);
          await userModel.findByIdAndUpdate(id, { username: updatedDescription}, { new: true });
        
          res.json("user updated successfully");

  }catch
  {

    return res.status(500).json({ error: 'Failed to update user' });
  }


}
}

module.exports= AuthController
