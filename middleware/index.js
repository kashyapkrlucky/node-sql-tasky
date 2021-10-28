const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

// Route Definition
const admin = require('../routes/admin');
const user = require('../routes/user');
const project = require('../routes/project');
const ticket = require('../routes/ticket');


// URL encoding, statics, morgan, logger & body parser middleware
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    app.use(express.static(path.join(__dirname, 'public')));

    // Global Middleware like Origin, Method, Headers, Credentials
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Routes
    app.use('/api/admin', admin);
    app.use('/api/user', user);
    app.use('/api/project', project);
    app.use('/api/ticket', ticket);
}
