import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {

    const selectedConversation = this.props.selectedConversation

    return (
      <div className="header">
        <h1 id="title">{this.props.text}
          {this.props.selectedConversation ? <span> - {selectedConversation} Conversation</span>: null}</h1>
      </div>
    );
  }
}

export default Header;
