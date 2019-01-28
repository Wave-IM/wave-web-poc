import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import WaveChat from './components/WaveChat';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
  }

  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <div className="chatContainer">
            <Route path='/chat' render={() => <WaveChat />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
