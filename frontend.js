var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , net = require('net')
  , sys = require('sys')
  , jade = require('jade');

// HTTP entrypoint
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
            clients[parts[0]].write(parts[1]);
        }
        });
});

// Main server
    net.createServer(onConnection).listen(8124);
    var clients = [];
    function onConnection(socket) {
     socket.setNoDelay(true);
      //sys.puts('client connected: ' + socket.remoteAddress);

     socket.addListener("data", function (data) {
        var text = data.toString('utf-8');
      if (text.substring(0,1) == '~') {
        clients[text.substring(1)] = socket;
      }
     });

     socket.addListener("end", function () {
      //sys.puts('end of connection');
      this.end();
     });
    }
