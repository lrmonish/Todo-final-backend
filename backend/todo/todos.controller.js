const Todo = require('./todo-schema');
const verifyToken = require('./todo-verifytoken'); 

const TodosController = {
  createPost: async function (req, res) {
    try {
      await verifyToken(req,res);

      const newTodo = new Todo(req.body);
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      console.error("Error creating todo:", err);
      res.status(400).json({ message: "Error creating todo" });
    }
  },

  getPost: async function(req, res) {
    try {
      await verifyToken(req,res); 

      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ message: "Error fetching todos" });
    }
  },

  getByidPost :async function (req, res) {
    try {
      await verifyToken(req,res); 

      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json(todo);
    } catch (err) {
      console.error("Error fetching todo:", err);
      res.status(500).json({ message: "Error fetching todo" });
    }
  },

  putPost: async (req, res) => {
    try {
      await verifyToken(req,res); 

      const updatedDescription = req.body.description; 
      const id = req.params.id;
  
      await Todo.findByIdAndUpdate(id, { description: updatedDescription }, { new: true });
  
      res.json("Todo description updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json("Error updating todo");
    }
  },

  deletePost: async (req, res) => {
    try {
      await verifyToken(req,res); 

      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({ message: "Error deleting todo" });
    }
  }
};

module.exports = TodosController;
