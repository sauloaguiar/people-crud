import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from './components/People';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <People />
      </div>
    );
  }
}

export default App;
