import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  createNewMessage = newMessageInput => {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: newMessageInput
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty 👋</a>
        </nav>

        <ChatBar currentUser={this.state.currentUser} createNewMessage={this.createNewMessage}/>
        <MessageList messages={this.state.messages} />

      </div>
    );
  }
}


export default App;