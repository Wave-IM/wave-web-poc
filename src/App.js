import React, { Component } from 'react';
import './App.css';
import { Header, MessagesList, SendMessageForm } from './components'
import * as mqttJS from './modules/mqtt'
import mqtt from 'mqtt';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages : []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    var options =
    {
        // wsOptions: wsoptions,
        clientId: "1fa63f2f-0e2a-4d14-ab1b-2d3d020aa1d2", 
        protocol: 'tcp',
        hostname: "127.0.0.1",
        port: 9001,
        path: "/mqtt"
    }
    
    
        const client  = mqtt.connect("ws://127.0.0.1:8080/mqtt")
          
      client.on('connect', function () {
    
        console.log("success")
        // client.subscribe('blabla', function (err) {
        //     if (!err) {xx
        //       client.publish('blabla', 'Hello mqtt')
        //     }
        // })
      })  }

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
