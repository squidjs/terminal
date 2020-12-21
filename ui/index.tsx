import React from 'react';
import { render } from 'react-dom';
import App from './app';

if(module.hot)
    module.hot.accept();

const root = document.getElementById('app');

render(<App />, root);
