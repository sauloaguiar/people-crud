import React, { Component } from 'react';
import People from './components/People';
import Person from './components/Person';
import { BrowserRouter, Route } from 'react-router-dom';
import Appbar from './components/Appbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Appbar />
          <Route exact path={'/'} component={People} />
          <Route exact path={'/new'} component={Person} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
