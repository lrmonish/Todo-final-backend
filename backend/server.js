const http = require('http');
const express = require('./app');
const server = http.createServer(express)
const port = 3000;
server.listen(port,()=>{console.log(`In port: ${port}`);});