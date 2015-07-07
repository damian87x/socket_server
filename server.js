'use strict';

var http       = require('http'),
    express    = require('express'),
    bodyParser = require ('body-parser'),
    morgan     = require ('morgan'),
    faye       = require('faye');
var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});

var app = express();
var server = http.createServer(app);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

bayeux.attach(server);

app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/about',function(req,res){
    res.writeHead(302, {'Location': 'http://localhost:4200/'});
    res.end();
});



app.get('/client1',function(req,res){
    res.sendFile(__dirname + '/public/client1.html');
});

app.get('/client2',function(req,res){
    res.sendFile(__dirname + '/public/client2.html');
});


app.get('/', function(req, res) {
    res.render('index', { title: 'The index page!' })
});

//app.get('/index',function(req,res){
//    res.sendFile(__dirname + '/public/index.ejs', { title: 'ejs' });
//});


app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});



var port = process.env.port || 8800;
server.listen(port);
console.log('Server up and listening on port ' + port);



