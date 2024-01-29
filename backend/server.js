const http = require('http');
const express = require('./app');
const server = http.createServer(express)
const port = 3000;
server.listen(port,()=>{console.log(`In port: ${port}`);});

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


    // const user = await User.findById('65b777c111b83ebaddf7fe03');
    // console.log(user.tasks);
   
}

// main();