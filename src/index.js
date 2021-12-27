import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './store'

import { WithCanvasContext } from './hooks';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WithCanvasContext>
        <App />
      </WithCanvasContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
