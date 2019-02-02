import React, { Component } from 'react';
import './WaveChat.css';
import { Header, MessagesList, SendMessageForm } from './'
import { WaveMQTTWrapper, WaveUtils } from '../modules/wave'
import { Config } from '../config'
import { BrowserRouter, Route } from 'react-router-dom'
import ConversationsList from './ConversationsList';

class WaveChat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            conversations: [],
            selectedConversation: ""
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.startConversation = this.startConversation.bind(this)
        this.onMessageArrived = this.onMessageArrived.bind(this)
        this.onSelectConversation = this.onSelectConversation.bind(this)

    }

    componentDidMount() {

        // Create private topic to receive incoming private messages
        const privateTopic = "conversations/private/+/".concat(Config.MQTT.username)

        // Instantiate Wave MQTT Wrapper
        this.waveMQTTWrapper = new WaveMQTTWrapper(Config.MQTT.connectionURL, Config.MQTT.clientID, [privateTopic], this.onMessageArrived)

        // Connect to broker
        this.waveMQTTWrapper.connect(Config.MQTT.username, Config.MQTT.password)
    }

    onMessageArrived(message, topic) {

        const senderID = WaveUtils.getSenderIDFromTopic(topic)

        this.setState(
            {
                messages: this.state.messages.concat({ senderID: senderID, text: message })
            }
        )
    }

    sendMessage(message) {

        this.waveMQTTWrapper.send(message, "conversations/private/" + Config.MQTT.clientID + "/" + this.state.selectedConversation)

        this.setState(
            {
                messages: this.state.messages.concat({ senderID: Config.MQTT.username, text: message })
            }
        )

    }

    onSelectConversation(selectedItem) {

        console.log(selectedItem.target.dataset)
        this.setState(
            {
                selectedConversation: selectedItem.target.dataset.conversationid
            }
        )
    }

    startConversation(dest) {
        this.setState(
            {
                conversations: this.state.conversations.concat(dest),
                selectedConversation: dest
            }
        )

    }

    render() {
        return (
            <BrowserRouter>
                <div className="WaveChat">
                    <div className="leftPartContainer">
                        <Header text="Conversations"/>
                        <Route render={() => <ConversationsList conversations={this.state.conversations} onSelectConversation={this.onSelectConversation} startConversation={this.startConversation}/>} />
                    </div>
                    <div className="rightPartContainer">
                        <Header text="Wave Web App PoC" selectedConversation={this.state.selectedConversation} />
                        <Route path='/chat' render={() => <MessagesList selectedConversation={this.state.selectedConversation} messages={this.state.messages} />} />
                        <SendMessageForm sendMessage={this.sendMessage} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default WaveChat;
