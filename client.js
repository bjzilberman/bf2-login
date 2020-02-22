var net = require('net');
var server = net.createServer(function(socket) {
  // Handle our Data
  socket.on('data',function(data){
    var m = new Date();
    var dateString =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2) + " " +
      ("0" + m.getUTCHours()).slice(-2) + ":" +
      ("0" + m.getUTCMinutes()).slice(-2) + ":" +
      ("0" + m.getUTCSeconds()).slice(-2);

    var message = Buffer.from(data, 'hex');
    var recv = message.toString().split('\\');
    var buffer = "";

    if(recv[1]=="nicks") {
      console.log(recv[1]);
       buffer = Buffer.from("\\nr\\1\\nick\\asdf\\uniquenick\\asdf\\ndone\\\\final\\", 'ascii');
    }

    if(recv[1]=="check") {
      console.log(recv[1]);
       buffer = Buffer.from("\\cur\\0\\pid\\0\\final\\", 'ascii');
    }

    console.log("["+dateString+"] "+buffer+"\n");
    socket.write(buffer);
  });

  socket.on('error', function(err) {
   console.log(err);
	});

});
server.listen(29901, '127.0.0.1');
