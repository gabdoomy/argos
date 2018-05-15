import React from 'react';
import ReactDOM from 'react-dom';
const request = require('superagent')
const payload = require('./payload.JSON')
import {SearchPage} from './SearchPage.jsx'

ReactDOM.render(<SearchPage/>, document.getElementById('hello'));
