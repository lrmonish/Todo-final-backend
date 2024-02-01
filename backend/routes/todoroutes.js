const express = require('express');
const router = new express.Router();
const TodosController = require('../todo/todos.controller');
// const uploadMulter = require('./multer');



router.post("/api/todos/CreatePost",TodosController.createPost);
router.get("/api/todos/GetPost", TodosController.getPost);
router.get("/api/todos/GetPost/:id", TodosController.getByidPost);
router.put("/api/todos/EditPost/:id", TodosController.putPost);
router.put("/api/todos/updateComplete/:id", TodosController.updateCompleted);
router.delete("/api/todos/DeletePost/:id", TodosController.deletePost);
// router.post('/upload', uploadMulter.single('upload'), TodosController.postImage );
// router.delete('/upload', uploadMulter.single('upload'), TodosController.deleteImage);



module.exports=router;