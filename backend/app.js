const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const authroute = require('./routes/authroutes');
const todoroute = require('./routes/todoroutes');
const userPermissionRoute = require('./routes/userPermissionroute');
const adminPermissionRoute = require('./routes/adminPermissionroute')
require('dotenv').config();



const app = express();
exports.app = app;

mongoose.connect(process.env.URI)    
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('Error connecting to MongoDB');
    })

app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use(todoroute);
app.use(authroute);
app.use(userPermissionRoute);
app.use(adminPermissionRoute);
  
app.use(express.static("todoapp"))
module.exports = app;
