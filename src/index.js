import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/provider';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
