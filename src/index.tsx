import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

import './index.css';

const defaultInitialDimension = {width: 30, height: 20};

ReactDOM.render(
    <App initialDimension={defaultInitialDimension}/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
