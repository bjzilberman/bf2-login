var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('message',function(msg,info){
  var heartbeat = Buffer.from([0xfe, 0xfd, 0x09, 0x00, 0x00, 0x00, 0x00]);
  server.send(heartbeat,info.port,'localhost',function(err){
    if(err){
      server.close();
    }
  });
});

server.bind(27900);
