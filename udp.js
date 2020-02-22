var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

server.on('message',function(msg,info){
  var message = Buffer.from(msg, 'hex');

  var m = new Date();
  var dateString =
    m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

  //console.log(message);

  server.send(msg,info.port,'localhost',function(error){
    if(error){
      client.close();
    }else{
      console.log("["+dateString+"] "+msg+"");
    }
  });

});

server.bind(27900);
