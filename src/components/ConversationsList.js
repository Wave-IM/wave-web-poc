import React, { Component } from 'react';
import './ConversationsList.css';
import md5 from 'md5'

class ConversationsList extends Component {

  constructor() {
    super()
    this.state = {
      conversationToStart: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  scrollToBottom() {
    this.bottomAnchor.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  handleChange(e) {
    this.setState({
      conversationToStart: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    // TO DO : Change hardcoded value
    this.props.startConversation(this.state.conversationToStart)
    this.setState({
      conversationToStart: ''
    })
  }


  render() {

    const conversations = this.props.conversations

    let conversationsList = [];

    // If messages are present, we render them in UI
    // else, we display no messages yet (see render())
    if (conversations.length > 0) {
      conversationsList = conversations.map(
        conversation => {
          return <a onClick={this.props.onSelectConversation}
            data-conversationid={conversation}
            key={md5(Math.random())}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            {conversation}
            <span className="badge badge-primary badge-pill">2</span>
          </a>
        }
      )
    }

    return (
      <div className="conversations-container">
        <div className="list-group-flush">
          {conversationsList.length > 0 ? conversationsList : null}
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="send-message-form">
          <input
            onChange={this.handleChange}
            value={this.state.conversationToStart}
            placeholder="Add conversation"
            type="text" />
        </form>
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.bottomAnchor = el; }}>
        </div>
      </div>
    );
  }
}

export default ConversationsList;
