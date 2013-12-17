var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , net = require('net')
  , stream = net.createConnection(8124);
var jade = require('jade');
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
                stream.write(message);
        });
});
