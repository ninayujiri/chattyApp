import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
  render() {

    const messageComponent = this.props.messages.map(data => {
      console.log('data', data);
      return data.type === 'incomingNotification' ? (<Notification
          key={data.id}
          username={data.oldUsername}
          newUsername={data.username}
        />) : (<Message
          key={data.id}
          username={data.username}
          content={data.content}
        />);
    })

    return (
      <main className="messages">
        {messageComponent}
      </main>
    );
  }
}


export default MessageList;