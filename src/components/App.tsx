import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// To avoid the "TS7016: Could not find a declaration file for module" error
// reference: https://stackoverflow.com/a/42505940
// const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

import './App.css';

const width = 20, height = 30;

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-Header">
                        <AppBar title="Hey's Game of Life (ReactJs + TypeScript)" className="App-Header-AppBar"/>
                    </div>
                    <div className="App-Body">
                        <Board width={width} height={height}/>
                        <ControlPanel/>
                    </div>
                    <div className="App-Footer">
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
