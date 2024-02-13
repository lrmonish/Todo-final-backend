const Todo = require('../models/todo-schema');
const verifyToken = require('./todo-verifytoken');
require('dotenv').config();


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
      const userId = req.user._id;
      const role = req.user.role;
      
      if(role === 'admin' || role === 'superadmin')
      {
        const todos = await Todo.find();
        res.json(todos);
      return res.status(201)
      }
      else
      {
        const todos = await Todo.find({owner:userId});
        res.json(todos);
      return res.status(201)
      }
         
       
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

  updateCompleted: async(req, res) =>
  {

const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
      
           const id = req.params.id;
           const updatedDescription = !req.body.completed

           await Todo.findByIdAndUpdate(id, { completed: updatedDescription }, { new: true });
        
          res.json("Todo description updated successfully");
       
    } 

  },
  
  deletePost:  async (req, res) => {
    
    const temp= await verifyToken(req, res);
         
    if(temp.val)
    {
        console.log(req.user);
          const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
          if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
          res.json({ message: "Todo deleted successfully" });
    }

  },

  GetPostCompleted: async(req, res)=>
  { 
    try
    {
    
    const todos = await Todo.find({completed:"true"});
    res.json(todos);
    
       return res.status(201)

  }
    
  catch
    {
      return res.status(500)
    }
 


  }
};

module.exports = TodosController;
