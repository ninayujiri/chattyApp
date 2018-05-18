import React, {Component} from 'react';

class Message extends Component {
  render () {
    const customColor = this.props.color;

    const regEx = new RegExp('https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)', 'g');
    const image = this.props.content.match(regEx);
    let textOutput = this.props.content;

    // Handles images
    if (image) {
      textOutput = textOutput.replace(image, '')

      return(
        <div>
          <span style={{ color: customColor }} className="message-username">{ this.props.username }</span>
          <span className="message-content">{ textOutput }</span>
          <span className="message-image"><img src={ image[0] } width="500" alt="image" /></span>
        </div>
      )
    } else {
      return(
        <div className="message">
          <span style={{ color: customColor }} className="message-username">{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      );
    }
  }
}

export default Message;