var net = require('net'),
    sys = require('sys');

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
      else {
        var parts = text.split(':');
        if (parts[0] in clients) {
            clients[parts[0]].write(parts[1]);
        }
      }
     });

     socket.addListener("end", function () {
      //sys.puts('end of connection');
      this.end();
     });
    }

    //sys.puts('Server running at 127.0.0.1:8124');
