const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const TodosController = require('./todo/todos.controller');
const AuthController = require('./auth/auth.controller');

const app = express();
exports.app = app;

mongoose.connect("mongodb://localhost:27017")    
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('Error connecting to MongoDB');
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.post("/api/todos/CreatePost", TodosController.createPost);
app.get("/api/todos/GetPost", TodosController.getPost);
app.get("/api/todos/GetPost/:id", TodosController.getByidPost);
app.put("/api/todos/EditPost/:id", TodosController.putPost);
app.delete("/api/todos/DeletePost/:id", TodosController.deletePost);

app.post('/sign-up', AuthController.signup);
app.post('/login',AuthController.login)

module.exports = app;
