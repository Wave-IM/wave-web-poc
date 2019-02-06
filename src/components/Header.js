import React, { Component } from 'react';
import './Header.css';
import { Form, Row, Col, Button } from 'react-bootstrap'

class Header extends Component {
  render() {

    const selectedConversation = this.props.selectedConversation
    const loginForm = (
      <Form onSubmit={e => this.props.handleSubmit(e)}>
        <Row>
          <Col>
            <Form.Control onChange={(e) => { this.props.handleUsername(e); }} placeholder="Username" />
          </Col>
          <Col>
            <Form.Control  onChange={(e) => { this.props.handlePassword(e); }} type="password" placeholder="Password" />
          </Col>
          <Col>
            <Button type="submit">Log in</Button>
          </Col>
        </Row>
      </Form>
    )

    return (
      <div className="header">
        <h1 id="title">{this.props.text}
          {this.props.selectedConversation ? <span> - {selectedConversation} Conversation</span> : null}
        </h1>
        {this.props.withLogin ? loginForm : null}
      </div>
    );
  }
}

export default Header;
