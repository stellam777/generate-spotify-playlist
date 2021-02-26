import '../public/style.css';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './components/App';

ReactDom.render(
<BrowserRouter>
  <App />
</BrowserRouter>
, document.getElementById('app'));
