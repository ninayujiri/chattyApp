const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


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
wss.on('connection', (ws) => {
  console.log('Client connected');

  let numberOfUsers = wss.clients.size;

  const userConnect = {
    type: "userConnect",
    userCount: numberOfUsers
  }

  console.log('userConnect: ', userConnect);
  console.log('numberOfUsers:', numberOfUsers);


  // Display online users count
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(userConnect));
    }
  });

  // Handle all posted messages/ notifications
  ws.on('message', (incomingMsg) => {
    const parsedMsg = JSON.parse(incomingMsg);
    const uuid = uuidv4();

    switch(parsedMsg.type) {
      case "postMessage":
        parsedMsg.id = uuid;
        parsedMsg.type = "incomingMessage";
        break;
      case "postNotification":
        parsedMsg.id = uuid;
        parsedMsg.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }

    const returnMsg = JSON.stringify(parsedMsg);
    console.log('received: %s', returnMsg);

    // Send new messages to all clients online
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(returnMsg);
      }
    });

  });

  // Set up a callback for when a client closes the socket
  ws.on('close', () => {
    numberOfUsers = wss.clients.size;
    console.log('Client disconnected')
    const userDisconnect = {
      type: "userDisconnect",
      userCount: numberOfUsers
    }

    console.log('userDisconnect: ', userDisconnect);

    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(userDisconnect));
      }
    });

  });
});