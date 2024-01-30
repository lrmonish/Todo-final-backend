const Todo = require('./todo-schema');
const verifyToken = require('./todo-verifytoken');
require('dotenv').config();
const userModel = require('../auth/user-model');

const TodosController = {

  createPost: async function (req, res) 
  {
         const temp= await verifyToken(req, res);
         
          if(temp.val)
          {
            const newTodo = new Todo({
              ...req.body,  
            owner:req.user._id,
            ownerName:req.user.username
            })
            const savedTodo = await newTodo.save();
            
            return res.status(201).json(savedTodo);
          }
},


  getPost:  async function(req, res) {
    
       
    const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
         
          const todos = await Todo.find();
          res.json(todos);
        return res.status(201)
       
    } 

  },
  
  getByidPost : async function (req, res) {
    
       
    const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
         
          const todo = await Todo.findById(req.params.id);
          if (!todo) return res.status(404).json({ message: "Todo not found" });
          res.json(todo);
       
    }  

   
  },
  

  putPost:  async (req, res) => {
   
    const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
        
          const updatedDescription = req.body.description; 
          const id = req.params.id;
        
          await Todo.findByIdAndUpdate(id, { description: updatedDescription }, { new: true });
        
          res.json("Todo description updated successfully");
       
    } 

  },
  
  deletePost:  async (req, res) => {
    
    const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
        
          const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
          if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
          res.json({ message: "Todo deleted successfully" });
    }

  },

  postImage: async (req, res) => {
    try {
       await verifyToken(req, res);
  
    //   const { filename, mimetype } = req.file; 
    //  console.log(req.file.buffer);
      
      await userModel.findByIdAndUpdate(req.user._id, {
        avatar: req.file.buffer,
        // contentType: mimetype, 
        // filename, 
      }, { new: true }); 
  
      const updatedUser = req.user; 
  
      res.send(updatedUser); 
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Error in uploading" });
    }
  },

  deleteImage: async (req, res) => {
    try {
       await verifyToken(req, res);
  
      req.user.avatar=undefined;
     await req.user.save();
      const updatedUser = req.user.save(); 
  
      res.send(updatedUser); 
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Error in uploading" });
    }
  }
};

module.exports = TodosController;
