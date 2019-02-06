import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import SampleApp from './components/SampleApp';
import WaveChat from './components/WaveChat';
import { WaveMQTTWrapper, WaveUtils } from './modules/wave'
import { Config } from './config'
import Cookies from 'universal-cookie';
import md5 from 'md5'

class App extends Component {

  constructor(props) {
    super(props)

    // Create private topic to receive incoming private messages
    const privateTopic = "conversations/private/+/".concat(Config.MQTT.username)

    this.renderChatBox = this.renderChatBox.bind(this)
    this.onMessageArrived = this.onMessageArrived.bind(this)
    this.sendMessage = this.sendMessage.bind(this)

    this.state = {
      messages: [],
      waveMQTTWrapper: new WaveMQTTWrapper(Config.MQTT.connectionURL, Config.MQTT.clientID, [privateTopic], this.onMessageArrived)
    }
  }

  componentDidMount() {
    const cookies = new Cookies()
    cookies.set('conversations', JSON.stringify(['c3cb0915-f671-4d39-843a-254f5e37390b'], { 'path': '/' }))

    // Connect to broker
    this.state.waveMQTTWrapper.connect(Config.MQTT.username, Config.MQTT.password)
  }

  sendMessage(message, dest) {

    this.state.waveMQTTWrapper.send(message, "conversations/private/" + Config.MQTT.clientID + "/" + dest)

    this.setState(
      {
        messages: this.state.messages.concat({ senderID: Config.MQTT.username, text: message })
      }
    )

  }

  addMessages(senderID, message) {
    this.setState(
      {
        messages: this.state.messages.concat({ senderID: senderID, text: message })
      }
    )
  }

  onMessageArrived(message, topic) {

    const senderID = WaveUtils.getSenderIDFromTopic(topic)

    this.setState(
      {
        messages: this.state.messages.concat({ senderID: senderID, text: message })
      }
    )
 
  }

  renderChatBox(dest) {

    return (
      <div key={md5(Math.random())} className="chatContainer">
        <WaveChat messages={this.state.messages} sendMessage={this.sendMessage} waveMQTTWrapper={this.state.waveMQTTWrapper} dest={dest} />
      </div>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' render={
            () => {
              return (
                <div className="appContainer">
                  <SampleApp />
                </div>
              )
            }
          } />
          <Route path='/chat' render={
            () => {
              const cookies = new Cookies()
              const conversations = cookies.get('conversations')
              const boxes = conversations.map(
                (dest) => {
                  return (
                    this.renderChatBox(dest)
                  )
                }
              )

              return boxes
            }
          } />
        </div>
      </BrowserRouter >
    );
  }
}


export default App;
