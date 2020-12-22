import React from 'react';
import { render } from 'react-dom';
import App from './App';

if(module.hot)
    module.hot.accept();

const root = document.getElementById('app');

render(<App />, root);
