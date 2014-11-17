'use strict';

var express = require('express'),
    path = require('path'),
    http = require('http'),
    multipart = require('connect-multiparty'),
    m = multipart(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    favicon = require('serve-favicon'),
    os = require('os'),
    app = express(),
    route = require('./route'),
    config = require('./config'),
    server, boot, shutdown;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, config.favicon)));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', route.index);
app.post('/upload', m, route.upload.uploadHandler);


// Handler any other route.
app.use(function(req, res, next) {
    res.type('text/html');
    res.status(404);
    res.render('404');
});



// Start server

server = http.createServer(app);

boot = function() {
    server.listen(config.port, function() {
        console.info('Server was running at port ' + config.port);
    });
};

shutdown = function() {
    server.close();
};

if(require.main === module) {
    boot();
} else {
    console.info('Running app as module');
    exports.boot = boot;
    exports.shutdown = shutdown;
}
