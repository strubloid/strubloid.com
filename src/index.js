import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// That is how we add bootstrap into the project
import 'bootstrap/dist/css/bootstrap.css';
import Counter from './components/counter/counter'

ReactDOM.render(<Counter />,  document.getElementById('root'));

serviceWorker.unregister();
