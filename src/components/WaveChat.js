import React, { Component } from 'react';
import './WaveChat.css';
import { Header, MessagesList, SendMessageForm } from './'
import { WaveUtils } from '../modules/wave'
import { Config } from '../config'
import { BrowserRouter, Route } from 'react-router-dom'

class WaveChat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            conversations: [],
        }
    }

    componentDidMount() {
    }

    render() {
        
        return (
            <BrowserRouter>
                <div className="WaveChat">
                        <Header text={this.props.dest} />
                        <Route path='/chat' render={() => <MessagesList selectedConversation={this.props.dest} messages={this.props.messages} />} />
                        <SendMessageForm sendMessage={this.props.sendMessage} />
                </div>
            </BrowserRouter>
        );
    }
}

export default WaveChat;
