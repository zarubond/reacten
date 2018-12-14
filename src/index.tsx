import React from 'react';
//import ReactDOM from 'react-dom';
import ReactenRenderer from './renderer/renderer';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
window.setTimeout(() =>{
    ReactenRenderer.render(<App />, document.getElementById('root'), () => {});
}, 3000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
