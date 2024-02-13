const UserModel = require('../models/user-model');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo-schema');
const verifyToken = require('../todo/todo-verifytoken');
const userModel = require('../models/user-model');
require('dotenv').config(); 
const axios = require('axios');

const secretString = process.env.SECRET_STRING; 
const adminkey = process.env.adminkey;
const userPermission = process.env.userP;
const AdminPermission = process.env.adminP;
let updatedDescription;
let id; 

const adminP = {
  name: "ADMIN",
  update: true,
  create: false,
  delete: false,
  completed: false,
};
const admindata = JSON.stringify(adminP);

const userP = {
  name: "ADMIN",
  update: true,
  create: false,
  delete: false,
  completed: false,
};
const userdata = JSON.stringify(userP);





const AuthController = {

  signup: async (req, res) => {

    let rolegiven = false;
        
    if(req.body.adminkey == adminkey)
    {
            rolegiven = true;
            
      try {
        await axios.post(AdminPermission,admindata);
        await axios.post(userPermission,userdata);
      } catch (error) {
        console.error(error);
      }
             
    }

    try {
          const userModel = new UserModel({
            username: req.body.username,
            password: req.body.password, 
            isAdmin:rolegiven
            
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
 
           const token = jwt.sign({ username: user.username, userId: user._id, isAdmin:user.isAdmin, role: user.role}, secretString, { expiresIn: '1h' });

          let username =  req.body.username

           res.setHeader('Authorization', `Bearer ${token}`, 'username', `username ${username}`);
           res.setHeader( 'username', `${username}`);
             
           res.status(201).json({ token: token, expiresIn: 3600, user:user.isAdmin, username:username, role:user.role});
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

    let users = await userModel.find();
    let user = await users;
    
   return  res.json(users);
 

   }catch
   {
    
    res.status(500).json({ error: 'Failed to get user' });
   }
  



},

getallUsersForAdmin: async(req,res)=>
{
   try{

    let users = await userModel.find({isAdmin:true});
    let user = await users;
    
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
    await Todo.deleteMany({ owner:req.params.id});
    

    if (!deletedTodo) return res.status(404).json({ message: "user not found" });
    return res.json({ message: "user deleted successfully" });
  
  }catch
  {

    return res.status(500).json({ error: 'Failed to delete user' });
  }


},

edituserbyadmin: async (req, res) => {
  
  
  const temp= await verifyToken(req, res); 
  if(temp.val)

  {
    try {
    
      updatedDescription = req.body.username;
      id = req.params.id;
     
      await userModel.findByIdAndUpdate(id, { username: updatedDescription }, { new: true });
      
      res.json("user updated successfully");
  } catch {
      return res.status(500).json({ error: 'Failed to update user' });
  }
}
},

editAll: async(req, res)=>
{ 
  try
  {
    
    const temp= await verifyToken(req, res); 
    if(temp.val)

    {
    let userId = await req.body.userId;
    await Todo.updateMany(
      { owner: userId }, 
      { $set: { ownerName: updatedDescription } } 
  );
  return res.status(200).json({ error: ' updated user' }); 
    }
}
catch
{
  return res.status(500).json({ error: 'Failed to update user' });

}
  
},
updateAccess: async(req, res)=>
{
  const temp= await verifyToken(req, res);
         
  if(temp.val)
  {
         const id = req.params.id;
         const updatedDescription = !req.body.isAdmin

         await userModel.findByIdAndUpdate(
          id,
          { isAdmin: updatedDescription },
          { new: true, runValidators: true } 
        )
          .then(async (updatedUser) => {
            if (updatedUser) {
              const newRole = updatedUser.isAdmin ? 'admin' : 'user';
              await userModel.findByIdAndUpdate(id, { role: newRole }, { new: true });
            } else {
              console.error(`User with ID ${id} not found!`);
            }
          })
          .catch((error) => {
            console.error(`Error updating user: ${error}`);
          });
        
      
        res.json("Access changed");
     
  } 


}
}

module.exports= AuthController
