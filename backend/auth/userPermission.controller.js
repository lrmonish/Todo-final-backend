const userPermissions = require('../models/userpermission');
const verifyToken = require('../todo/todo-verifytoken');
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
      const temp= await verifyToken(req, res);
    
    if(temp.val)
    {
      try
      {
        const p = await userPermissions.find({name:"USER"});
        res.json(p);
      return res.status(201)

      } catch

      {
        return res.status(500).json("error in getting ");
      }
      
    }
    
    },



  createP: async(req, res)=>
  {
    const temp= await verifyToken(req, res);
    
    if(temp.val)
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
}

  },




  updateP:async(req, res)=>
  {
    const temp= await verifyToken(req, res);
    
    if(temp.val)
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
    
    }
  },




deleteP: async(req, res)=>
{
  const temp= await verifyToken(req, res);
    
  if(temp.val)
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
  
  }
},




completedP :async(req, res)=>
{
  const temp= await verifyToken(req, res);
    
  if(temp.val)
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





}

module.exports= userPermissioncontroller;
