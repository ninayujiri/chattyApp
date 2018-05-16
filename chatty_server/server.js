const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
// const WebSocket = require('ws');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (incomingMsg) => {
    const parsedMsg = JSON.parse(incomingMsg);
    const uuid = uuidv4();

    if(parsedMsg.type === "postMessage") {
      parsedMsg.id = uuid;
      parsedMsg.type = "incomingMessage";
    }
    else if(parsedMsg.type === "postNotification") {
      parsedMsg.id = uuid;
      parsedMsg.type = "incomingNotification";
    }

    const returnMsg = JSON.stringify(parsedMsg);
    console.log('received: %s', returnMsg);

    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(returnMsg);
      }
    });

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});