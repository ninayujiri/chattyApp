import React, {Component} from 'react';

class Notification extends Component {
  render () {
    return(
      <div className="message system">
        {this.props.username} changed their name to {this.props.newUsername}
      </div>
    );
  }
}

export default Notification;