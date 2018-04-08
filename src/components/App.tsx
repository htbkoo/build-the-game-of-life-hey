import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// To avoid the "TS7016: Could not find a declaration file for module" error
// reference: https://stackoverflow.com/a/42505940
// const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

import './App.css';

type AppProps = {};

type AppState = {
    width: number,
    height: number
};

const width = 30, height = 20;

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            width,
            height
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-Header">
                        <AppBar title="Hey's Game of Life (ReactJs + TypeScript)" className="App-Header-AppBar"/>
                    </div>
                    <div className="App-Body">
                        <Board width={this.state.width} height={this.state.height}/>
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
