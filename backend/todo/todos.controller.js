const Todo = require('./todo-schema');
// const verifyToken = require('./todo-verifytoken'); 
const jwt = require('jsonwebtoken');
const verifyToken = require('./todo-verifytoken');
require('dotenv').config();
const secretString = process.env.SECRET_STRING;


const TodosController = {

  createPost: async function (req, res) 
  {
         const temp= await verifyToken(req, res);
         
          if(temp.val)
          {
            const newTodo =  new Todo(req.body);
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

  }
};

module.exports = TodosController;
