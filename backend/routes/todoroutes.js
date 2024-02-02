const express = require('express');
const router = new express.Router();
const TodosController = require('../todo/todos.controller');




router.post("/CreatePost",TodosController.createPost);
router.get("/GetPostCompleted", TodosController.GetPostCompleted);
router.get("/GetPost", TodosController.getPost);
router.get("/GetPost/:id", TodosController.getByidPost);
router.put("/EditPost/:id", TodosController.putPost);
router.put("/updateComplete/:id", TodosController.updateCompleted);
router.delete("/DeletePost/:id", TodosController.deletePost);




module.exports=router;