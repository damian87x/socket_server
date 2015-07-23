'use strict';

var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    faye = require('faye'),
    routes = require('./routes');



var app = express();
var server = http.createServer(app);


// Configuration

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


// Set up chat

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

bayeux.attach(server);

// Routes

app.get('/', routes.index);
app.get('/client/:id', routes.client);
app.post('/message',  function(req, res){
    bayeux.getClient().publish('/channel', {text: req.body.message});
    res.sendStatus(200);
});



//app.get('/client/:id', routes.client);


// Server

var port = process.env.port || 8800;
server.listen(port);
console.log('Server up and listening on port ' + port);



