import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './configureStore'

const store = configureStore()


//
store.dispatch({
    type: 'ADD_TODO',
    text: 'Read the docs'
  })
  
console.log('getState()', store.getState())
//


ReactDOM.render(
    <App store={store} />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
