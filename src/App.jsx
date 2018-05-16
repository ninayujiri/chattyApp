import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: "Bob"},
      messages: []
    };
  }

  updateUsername = newUserInput => {
    console.log('newUserInput: ', newUserInput)
    const newUser = {
      type: "postNotification",
      username: newUserInput
    };
    this.setState({currentUser: newUser})
    this.socket.send(JSON.stringify(newUser));
  }

  addMessage = newMessageInput => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.username,
      content: newMessageInput
    };
    console.log('newMessage: ', newMessage);
    this.socket.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    // Opens Websocket connection
    this.socket = new WebSocket("ws://localhost:3001");

    // When connected, console.log
    this.socket.onopen = () => console.log('Connected to server');

    // Handles the incoming message
    this.socket.onmessage = (event) => {

      // console.log(event);

      const parsedEvent = JSON.parse(event.data);
      // console.log('parsed event:', parsedEvent);

      switch(parsedEvent.type) {
        case "incomingMessage":
          console.log(1, parsedEvent);
          const messages = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, messages]}));
          break;
        case "incomingNotification":
          console.log(2, parsedEvent);
          const notification = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, notification]}));

          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty 👋</a>
        </nav>

        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} updateUsername={this.updateUsername} />
        <MessageList messages={this.state.messages} />

      </div>
    );
  }
}


export default App;