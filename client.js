require('daemon')();
var net = require('net'),
 applescript = require("applescript"),
 os = require("os");

var io_client = require( 'socket.io-client' );
var socket = io_client.connect('http://fast-citadel-8937.herokuapp.com');
socket.on("connect", function(){
 socket.emit('join','~' + os.hostname().replace(/[^a-zA-Z0-9-\.]*/g,"").toLowerCase());
});

var commands = {
  playpause: 'playpause',
  prev:      'play previous track',
  next:      'play next track',
  mute:      'set volume output muted not (output muted of (get volume settings))',
  up:        'set volume output volume ((output volume of (get volume settings)) + 10)',
  down:      'set volume output volume ((output volume of (get volume settings)) - 10)'
};

socket.on("cmd", function(data){
  if (data in commands) {
    applescript.execString( 'if application "Spotify" is running then' + "\n" +
                                'run script "tell application \\"Spotify\\" to ' + commands[data] + "\"\n" +
                            'else if application "iTunes" is running then' + "\n" +
                                    'run script "tell application \\"iTunes\\" to ' + commands[data]+ "\"\n" +
                            'end if',
      function(err, rtn) {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});
