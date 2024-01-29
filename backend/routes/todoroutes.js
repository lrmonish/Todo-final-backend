const express = require('express');
const router = new express.Router();
const TodosController = require('../todo/todos.controller');


router.post("/api/todos/CreatePost",TodosController.createPost);
router.get("/api/todos/GetPost", TodosController.getPost);
router.get("/api/todos/GetPost/:id", TodosController.getByidPost);
router.put("/api/todos/EditPost/:id", TodosController.putPost);
router.delete("/api/todos/DeletePost/:id", TodosController.deletePost);



module.exports=router;