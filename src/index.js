import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { WithCanvasContext } from './fabric/index';

ReactDOM.render(
  <React.StrictMode>
    <WithCanvasContext>
      <App />
    </WithCanvasContext>
  </React.StrictMode>,
  document.getElementById('root')
);
