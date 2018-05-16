import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  updateUsername = newUserInput => {
    console.log('newUserInput: ', newUserInput)
    const newUser = { name: newUserInput};
    this.setState({currentUser: newUser})
    // this.socket.send(JSON.stringify(newUser));
  }

  addMessage = newMessageInput => {
    const newMessage = {
      username: this.state.currentUser.name,
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
      console.log(event);
      const messages = JSON.parse(event.data);
      this.setState(prevState => ({ messages: [...prevState.messages, messages]}));
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