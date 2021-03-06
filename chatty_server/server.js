const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
// const querystring = require('querystring');
const fetch = require('node-fetch');


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

  // Assigns a random color to each user when they connect
  const colors = ['#4A849F', '#1B3440', '#B4D6C6', '#F2845C', '#E4523B', '#0A454D', '#3DB296', '#ECC417', '#E8931E']

  function getIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomIndex = getIndex(9);
  let customColor = colors[randomIndex];

  const userColor = {
    type: 'color',
    color: customColor
  }

  // Send user color upon connection
  ws.send(JSON.stringify(userColor));

  let numberOfUsers = wss.clients.size;

  const userConnect = {
    type: "userConnect",
    userCount: numberOfUsers
  }

  // Display online users count
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(userConnect));
    }
  });

  // Recieve message, parse, add a unique id and send back
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
    console.log('Client disconnected')

    numberOfUsers = wss.clients.size;
    const userDisconnect = {
      type: "userDisconnect",
      userCount: numberOfUsers
    }

    // Update online user count after a user disconnects
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(userDisconnect));
      }
    });
  });
});