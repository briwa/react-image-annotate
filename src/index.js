import { StrictMode as ReactStrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './store'

import { WithCanvasContext } from './hooks';

ReactDOM.render(
  <ReactStrictMode>
    <Provider store={store}>
      <WithCanvasContext>
        <App />
      </WithCanvasContext>
    </Provider>
  </ReactStrictMode>,
  document.getElementById('root')
);
