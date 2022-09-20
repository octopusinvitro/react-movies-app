import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const apiKey = (new URLSearchParams(window.location.search)).get('apikey');

ReactDOM.render(
	<React.StrictMode><App apiKey={apiKey} delay="500" /></React.StrictMode>,
	document.getElementById('root')
);
