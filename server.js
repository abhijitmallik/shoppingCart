const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const Cookies = require("cookies");
const configFile = require('./config/serverConfig')
const config = {port:process.env.PORT || configFile.server.port,dbURL:""};
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
server.listen(config.port,function(){
    console.log("application is listening on port",config.port);
})