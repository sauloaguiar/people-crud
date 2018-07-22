import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from './components/People';
import Person from './components/Person';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
          </div>
          <Route exact path={'/'} component={People} />
          <Route exact path={'/new'} component={Person} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
