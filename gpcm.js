var net = require('net');
var bfutils = require('./bfutils');

// Start our server

var server = net.createServer(function(socket) {

  // Handle socket
  socket.on('data',function(data){

    var handleStep = 0;
    var message = Buffer.from(data, 'hex');
    var pMsg = bfutils.respByKey( message );

    switch(pMsg.action) {
      case 'nicks':

        var dbuserNick = 'asdf';
        bfutils.sendMsg( socket, { nr:1, nick:dbuserNick, uniquenick:dbuserNick, ndone:'' } );

      break;
      case 'check':

        bfutils.sendMsg( socket, { cur:0, pid:1 } );

      break;
    }
  });

  socket.on('error', function(err) {
   console.log(err);
	});

  socket.pipe( socket );
});

server.listen(29901, '127.0.0.1');
