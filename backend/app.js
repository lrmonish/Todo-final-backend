const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const authroute = require('./routes/authroutes');
const todoroute = require('./routes/todoroutes');
const userPermissionRoute = require('./routes/userPermissionroute');
const adminPermissionRoute = require('./routes/adminPermissionroute')


const userPermissions = require('./auth/userpermission');
const adminPermissions = require('./auth/adminPermission');



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


// app.get('/userPermissionof/:temp', async(req, res)=>
// {
//    const temp = req.params.temp;
//     const p = await userPermissions.find({name:"USER"});
//     res.json(p);
//   return res.status(201)

// });

app.get('/userPermissionof/:fieldName', async (req, res) => {
    const { fieldName } = req.params;
  
    // Validate the received fieldName (add validation logic here)
  
    try {
      const document = await userPermissions.findOne({ name: "USER" }); // Search for document with name "USER"
  
      if (!document) {
        res.status(404).json({ error: `Document with name "USER" not found` });
        return;
      }
  
      const fieldValue = document[fieldName]; // Access the field value using dynamic field name
  
      if (typeof fieldValue === 'undefined') {
        res.status(400).json({ error: `Field "${fieldName}" not found in the document` });
        return;
      }
  
      res.json({ fieldValue });
    } catch (error) {
      // Handle errors gracefully (e.g., log the error, send a generic error response)
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
app.use(express.static("todoapp"))
module.exports = app;
