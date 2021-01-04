import 'v8-compile-cache';
import App from '@src/app/App';

// Start hot reloading in dev
if(module.hot)
	module.hot.accept();

const isDevelopment = process.env.NODE_ENV !== 'production';

// Instantiate a new app
new App(process.argv, isDevelopment);
