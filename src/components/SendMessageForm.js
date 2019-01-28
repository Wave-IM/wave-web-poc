import React, { Component } from 'react';
import './SendMessageForm.css';

class SendMessageForm extends Component {

constructor() {
    super()
    this.state = {
        message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleChange(e) {
    this.setState({
        message: e.target.value
    })
}

handleSubmit(e) {
    e.preventDefault()
    // TO DO : Change hardcoded value
    this.props.sendMessage(this.state.message, "1fa63f2f-0e2a-4d14-ab1b-2d3d020aa1d2")
    this.setState({
        message: ''
    })
}
  
render() {
    return (
      <form
          onSubmit={this.handleSubmit}
          className="send-message-form">
          <input
              onChange={this.handleChange}
              value={this.state.message}
              placeholder="Write a message..."
              type="text" />
      </form>
    );
  }
}

export default SendMessageForm;
