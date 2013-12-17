var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , net = require('net')
  , sys = require('sys')
  , jade = require('jade');

    var clients = [];
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
        app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res){
  res.render('remote.jade');
});
server.listen(8080);

io.sockets.on('connection', function (socket) {
        socket.on('message', function (message) {
            var parts = message.toString('utf-8').split(':');
            if (parts[0] in clients) {
            clients[parts[0]].emit('cmd',parts[1]);
        }
        });
        socket.on('join', function(message){
            var text = message.toString('utf-8');
            if (text.substring(0,1) == '~') {
                clients[text.substring(1)] = socket;
            }
        });
});
