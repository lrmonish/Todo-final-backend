const http = require('http');
const express = require('./app');
const server = http.createServer(express)
require('dotenv').config();


server.listen(process.env.PORT_SERVER,()=>{console.log(`In port: ${process.env.PORT_SERVER}`);});

const Todo = require('./todo/todo-schema');
const User = require('./auth/user-model');

const main = async()=>{

    // const task = Todo.findById("65b77d25d9cdda9440bf0f02");
    // await task.populate('owner').execPopulate().then(populatedTask => {
    //     console.log(populatedTask);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });


    // const user = await User.tasks;
    // // await user.populate('tasks').then(populatedUser => {
    // //     console.log(populatedUser);
    // //   });
    // console.log(User);
   
}

  
// main();