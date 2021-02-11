import React, { Component } from 'react';
import NavHeader from './NavHeader';
import NavMain from './NavMain';
import { BrowserRouter } from 'react-router-dom';
import CausalityDataProvider from 'data/provider';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


class App extends Component {
  render() {
    return (
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <div className="App">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <BrowserRouter>
            <NavHeader />
            <CausalityDataProvider>
              <NavMain />
            </CausalityDataProvider>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
