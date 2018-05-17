import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: "Anonymous"},
      messages: []
    };
  }

  updateUsername = (newUserInput, oldUser) => {
    const newUser = {
      type: "postNotification",
      username: newUserInput,
      oldUsername: oldUser
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
      switch(parsedEvent.type) {
        case "incomingMessage":
          const messages = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, messages]}));
          break;
        case "incomingNotification":
          const notification = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, notification]}));
          break;
        case "userConnect":
          let numberOfUsers = parsedEvent.userCount;
          this.setState({ userCount: numberOfUsers })
        case "userDisconnect":
          numberOfUsers = parsedEvent.userCount;
          this.setState({ userCount: numberOfUsers });
        // default:
        //   throw new Error("Unknown event type");
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty 👋</a>
          <p className="user-count">{this.state.userCount} user(s) are online</p>
        </nav>

        <ChatBar username={this.state.currentUser.username} addMessage={this.addMessage} updateUsername={this.updateUsername} />
        <MessageList messages={this.state.messages} />

      </div>
    );
  }
}

export default App;

