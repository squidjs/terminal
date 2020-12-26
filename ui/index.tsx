import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '../app/store/store';

if(module.hot)
    module.hot.accept();

const root = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>, root);
