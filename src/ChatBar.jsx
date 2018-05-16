import React, {Component} from 'react';

class ChatBar extends Component {

  handleUsername = event => {
    if(event.key === 'Enter'){
      this.props.updateUsername(event.target.value);
    }
  }

  handleMessage = event => {
    if(event.key === 'Enter'){
      this.props.addMessage(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            defaultValue={this.props.currentUser.username}
            onKeyPress={this.handleUsername}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onKeyPress={this.handleMessage}
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;