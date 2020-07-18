import React, { Component } from 'react';
import './App.css';
import NavHeader from './NavHeader';
import NavMain from './NavMain';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavHeader />
          <NavMain />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
