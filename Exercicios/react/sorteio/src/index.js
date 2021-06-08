import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Evento from './main/Evento';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <div>
      <Evento />
    </div>
  , document.getElementById('root'));
registerServiceWorker();

