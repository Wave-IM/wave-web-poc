import React, { Component } from 'react';
import './App.css';
import { Header, MessagesList, SendMessageForm } from './components'
import * as mqttJS from './modules/mqtt'
import  Paho from 'paho-mqtt';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages : []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {

      // Create a client instance
      let client = new Paho.Client("ws://localhost:8080/mqtt", "857ca9b3-5ced-4720-bf46-2edbebc3a669");

      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;
  
      const options = {
        userName: "857ca9b3-5ced-4720-bf46-2edbebc3a669",
        password: "tokenaaa",
        onSuccess: onConnect
      }
      // connect the client
      client.connect(options);
  
      // called when the client connects
      function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe("conversations/private/+/857ca9b3-5ced-4720-bf46-2edbebc3a669");
        // message = new Paho.MQTT.Message("Hello");
        // message.destinationName = "/World";
        // client.send(message); 
      }
  
      // // called when the client loses its connection
      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
        }
      }
  
      // called when a message arrives
      function onMessageArrived(message) {
        console.log("onMessageArrived:"+message.payloadString);
      }
    }

  sendMessage(message) {


    this.setState(
      {
        messages: this.state.messages.concat({senderID: "Terry", text: message})
      }
    )
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MessagesList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
