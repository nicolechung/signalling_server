'use strict';
const server = require('http').createServer()
const app = require('./http-server')

// Constants
const PORT = process.env.PORT || 5432;

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server });

// mount the app
server.on('request', app)

wss.broadcast = function(data) {
  for (var i in this.clients) {
    this.clients[i].send(data);
  }
}

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message)
    wss.broadcast(message);
  })
})

server.listen(PORT, function() {
  console.log(`http/ws listening on ${PORT}`);
});
