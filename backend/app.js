const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const authroute = require('./routes/authroutes');
const todoroute = require('./routes/todoroutes');
const userPermission = require('./auth/userpermission');



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



app.put('/createP', async (req, res) => 
{
    try
        {
            id='65c7ad67899dcc9d39c2979e';
            await userPermission.findByIdAndUpdate(id,{ create: true });
     
            res.json("userpermission updated successfully");
    
        }catch
        {
          return  res.json("some error");
        }



});

app.post('/createdb', async function createData(req, res) {
    try {
      const newPermission =  await new UserPermission({
         update: true,
        create: true,
        delete: true,
        completed: true,
    });
  
      await newPermission.save(); 
      res.status(201).json({ message: 'Data created successfully!' });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error creating data' });
    }
  });



app.use(express.static("todoapp"))
module.exports = app;
