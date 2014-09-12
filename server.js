'use strict';

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    favicon = require('serve-favicon'),
    os = require('os'),
    app = express(),
    route = require('./route'),
    config = require('./config');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, config.favicon)));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', route);

app.use(function(req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});


module.exports = app;
