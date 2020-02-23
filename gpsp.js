var net = require('net');
var bfutils = require('./bfutils');

// Start our server

var server = net.createServer(function(socket) {

  // Send server challenge
  var serverChallengeKey = bfutils.randomString(10);
  bfutils.sendMsg( socket, { lc:1, challenge:serverChallengeKey, id:1 } );

  // Handle socket
  socket.on('data',function(data){

    var handleStep = 0;
    var message = Buffer.from(data, 'hex');
    var pMsg = bfutils.respByKey( message );

    switch(pMsg.action) {
      case 'login':

        var password = 'asdf';
        var pid = 1;
        var sessionKey = bfutils.sessionKey( pMsg.uniquenick );
        var cR = bfutils.challengeResponse( pMsg.uniquenick, password, pMsg.challenge, serverChallengeKey );
        if( pMsg.response == cR ) {
          var gtProof = bfutils.challengeResponse( pMsg.uniquenick, password, serverChallengeKey, pMsg.challenge );
          var gtLt = bfutils.randomString(22)+'__';
          bfutils.sendMsg( socket, { lc:2, sesskey:sessionKey, proof:gtProof, userid:pid, profileid:pid, uniquenick:pMsg.uniquenick, lt:gtLt, id:1 } );
          handleStep++;
        } else {
          bfutils.sendMsg( socket, { error:'', err:260, fatal:'', errmsg:'[bfutils] Wrong password.', id:1 } );
        }

      break;
      case 'getprofile':

        var retrieve = '2';
        var dbuserId = '1';
        var dbuserEmail = "asdf@asdf.com";
        var dbuserCountry = '00';
        if(handleStep < 2) {
          retrieve = '5';
          handleStep++;
        }
        console.log('[getprofile retrieve]: '+retrieve);
        console.log('[handle step]: '+handleStep);
        bfutils.sendMsg( socket, { pi:'', profileid:dbuserId, nick:pMsg.uniquenick, userid:dbuserId, email:dbuserEmail, sig:bfutils.generateSig(), uniquenick:pMsg.uniquenick, pid:0, firstname:'', lastname:'', homepage:'', zipcode:'12345', countrycode:dbuserCountry, st:'  ', birthday:'16844722', pmask:'64', conn:'0', i1:'0', o1:'0', mp:'0', lon:'0.000000', lat:'0.000000', loc:'', id:'2', } );

      break;
    }

  });

  socket.on('error', function(err) {
   console.log(err);
	});

  socket.pipe( socket );
});

server.listen( 29900, '127.0.0.1' );
