const adminPermissions = require('./adminPermission');

require('dotenv').config(); 



const adminPermissioncontroller = 
{
    postUser:async (req, res) => {
        try {
          const newPermission = new adminPermissions(req.body);
          await newPermission.save();
          res.json({ message: 'Permission created successfully', data: newPermission });
        } catch (err) {
          res.status(500).json({ message: 'Error creating permission', error: err.message });
        }
      },

    getP: async(req, res)=>

    {
      const p = await adminPermissions.find({name:"ADMIN"});
      res.json(p);
    return res.status(201)
    
    },

  createP: async(req, res)=>
  {
 try
 {
  let name = { name: 'ADMIN' };
  let boolval = req.body.boolval;
    
  await adminPermissions.findOneAndUpdate(
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
  let name = { name: 'ADMIN' };
  let boolval = req.body.boolval;
    
  await adminPermissions.findOneAndUpdate(
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
let name = { name: 'ADMIN' };
let boolval = req.body.boolval;
  
await adminPermissions.findOneAndUpdate(
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
let name = { name: 'ADMIN' };
let boolval = req.body.boolval;
  
await adminPermissions.findOneAndUpdate(
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

module.exports= adminPermissioncontroller;
