import '@fontsource/roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, unstable_createMuiStrictModeTheme, CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './redux/store';
import { worker } from './mocks/browser';

const rootNode = document.getElementById('root') as HTMLElement;
const theme = unstable_createMuiStrictModeTheme();

worker.start({
  onUnhandledRequest: 'bypass',
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  rootNode
);
