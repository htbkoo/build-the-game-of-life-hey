import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// To avoid the "TS7016: Could not find a declaration file for module" error
// reference: https://stackoverflow.com/a/42505940
// const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

import './index.css';

ReactDOM.render(
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
