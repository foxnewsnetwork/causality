import React, { Component } from 'react';
import NavHeader from './NavHeader';
import NavMain from './NavMain';
import { BrowserRouter } from 'react-router-dom';
import CausalityDataProvider from 'data/provider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <CausalityDataProvider>
          <BrowserRouter>
            <NavHeader />
            <NavMain />
          </BrowserRouter>
        </CausalityDataProvider>
      </div>
    );
  }
}

export default App;
