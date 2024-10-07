const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routers/router')
const port = 3007;
const db = require('./config/db');

server.use(bodyParser.urlencoded({extended: true}));
server.set('view engine', 'ejs');

server.use(express.static('uploads'));
server.use(express.static(path.join(__dirname, 'public')));

server.use('/' , router);

server.listen(3007, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    
});