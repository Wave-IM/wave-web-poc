import React, { Component } from 'react';
import './MessagesList.css';
import  md5  from 'md5'

class MessagesList extends Component {
  
  
  scrollToBottom() {
    this.bottomAnchor.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  render() {

    const messages = this.props.messages

    const alertInfo = (
      <div className="alert-warning-container">
        <div className="alert alert-warning">No Messages yet !</div>
      </div>
    )

    let messagesList = [];
    
    // If messages are present, we render them in UI
    // else, we display no messages yet (see render())
    if (messages.length > 0) {
        messagesList = messages.map( 
          message => {
              return <li key={md5(message.senderID + message.text + Math.random())} className="message">
                  <div className="sender">{message.senderID}</div>
                  <div className="text">{message.text}</div>
              </li>
          }
      )
    }

    return (
      <div className="messages-container">
        <ul className="messages-list">
          {messagesList.length > 0 ? messagesList : alertInfo}
        </ul>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.bottomAnchor = el; }}>
        </div>
      </div>
    );
  }
}

export default MessagesList;
