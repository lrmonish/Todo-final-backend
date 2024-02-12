const userPermissions = require('./userpermission');
// const verifyToken = require('../todo/todo-verifytoken');
require('dotenv').config(); 



const userPermissioncontroller = 
{
    postUser:async (req, res) => {
        try {
          const newPermission = new userPermissions(req.body);
          await newPermission.save();
          res.json({ message: 'Permission created successfully', data: newPermission });
        } catch (err) {
          res.status(500).json({ message: 'Error creating permission', error: err.message });
        }
      },

    getP: async(req, res)=>

    {
      const p = await userPermissions.find({name:"USER"});
      res.json(p);
    return res.status(201)
    
    },

  createP: async(req, res)=>
  {
 try
 {
  let name = { name: 'USER' };
  let boolval = req.body.boolval;
    
  await userPermissions.findOneAndUpdate(
    name,
    { create : boolval },
    { new: true },
    );
  
  return res.json({ message: 'create updated successfully' });

 }catch
 {
  return res.json({ message: 'error create updated' });
 }
    

  },

  updateP:async(req, res)=>
  {
 try
 {
  let name = { name: 'USER' };
  let boolval = req.body.boolval;
    
  await userPermissions.findOneAndUpdate(
    name,
    { update : boolval },
    { new: true },
    );
  
  return res.json({ message: ' updated successfully' });

 }catch
 {
  return res.json({ message: 'error update updated' });
 }
    

  },

deleteP: async(req, res)=>
{
try
{
let name = { name: 'USER' };
let boolval = req.body.boolval;
  
await userPermissions.findOneAndUpdate(
  name,
  { delete : boolval },
  { new: true },
  );

return res.json({ message: ' delete successfully' });

}catch
{
return res.json({ message: 'error delete updated' });
}
  

},

completedP :async(req, res)=>
{
try
{
let name = { name: 'USER' };
let boolval = req.body.boolval;
  
await userPermissions.findOneAndUpdate(
  name,
  { completed : boolval },
  { new: true },
  );

return res.json({ message: 'completed successfully' });

}catch
{
return res.json({ message: 'error completed updated' });
}
  

}

}

module.exports= userPermissioncontroller;