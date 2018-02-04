'use strict';

const fs = require('fs')
const WebSocket = require('ws');

// TLS required for WebRTC
const serverConfig = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem'),
};

// for HTTPS (when cert is set up)
//const server = require('https').createServer()
const server = require('http').createServer()
const app = require('./http-server')
const httpsServer = require('https').createServer(serverConfig, app)


// Constants
const PORT = process.env.PORT || 8080;

const WebSocketServer = require('ws').Server;

let wss
if (process.env.NODE_ENV === 'development') {
  wss = new WebSocketServer({ server });
} else {
  wss = new WebSocketServer({ server: httpsServer });
}


// mount the app
server.on('request', app)

console.log('server on', server)

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message)
    wss.broadcast(message);
  })
})

server.listen(PORT, function() {
  console.log(`http/ws listening on ${PORT}`);
  console.log('env' + process.env.NODE_ENV)
});

const SECUREPORT = process.env.NODE_ENV === 'production' ? 443 : 8443
httpsServer.listen(SECUREPORT, function() {
  console.log(`http/ws listening on ${PORT}`);
  console.log('env' + process.env.NODE_ENV)
})
