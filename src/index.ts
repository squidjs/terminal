import 'v8-compile-cache';
import App from '@src/app/App';

// Start hot reloading in dev
if(module.hot)
    module.hot.accept();

// Instantiate a new app
new App();
