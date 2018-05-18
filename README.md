Chatty App
=====================

A single-page chat app that allows users to send messages and images to each other in real time. Users can chat anonymously or with a chosen username. Chatty also displays the number of people who are online at any given moment, so users can see if their messages are being seen by others.

Chatty uses React, and communicates with a server via WebSockets.


## Final Product

!["GIF of Process"](https://github.com/ninayujiri/chattyApp/blob/master/docs/chatty.gif?raw=true)


### Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the local server using the `npm start` command.
4. In a new terminal, `cd` into the chatty_server directory and start the websocket server using the `npm start` command.
5. Go to http://localhost:3000/ in your browser.


### Dependencies

* React
* React-DOM
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Node-sass
