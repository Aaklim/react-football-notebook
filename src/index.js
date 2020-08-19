import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import Main from './Containers/Main/Main';

ReactDOM.render(

  <React.StrictMode>

    <Main />

  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
