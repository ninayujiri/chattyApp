import React, {Component} from 'react';

class ChatBar extends Component {

  handleKeyPress = event => {
    if(event.key === 'Enter'){
      this.props.createNewMessage(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" defaultValue={this.props.currentUser.name}/>
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onKeyPress={this.handleKeyPress}
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;