const http = require('http');
const express = require('./app');
const server = http.createServer(express)
require('dotenv').config();

server.listen(process.env.PORT_SERVER,()=>{console.log(`In port: ${process.env.PORT_SERVER}`);});