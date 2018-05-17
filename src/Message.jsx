import React, {Component} from 'react';

class Message extends Component {
    render () {

    let customColor = this.props.color;
    console.log('message customcolor', customColor);

    return(
      <div className="message">
        <span style={{ color: customColor }} className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    );
  }
}

export default Message;