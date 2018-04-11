import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// To avoid the "TS7016: Could not find a declaration file for module" error
// reference: https://stackoverflow.com/a/42505940
// const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

import './App.css';
import Game from '../services/Game';

type AppProps = {};

type AppState = {
    board: BoardState
};

type BoardState = {
    width: number,
    height: number,
    isLives: IsLivesState
};

type IsLivesState = ReadonlyArray<ReadonlyArray<boolean>>;

class App extends React.Component<AppProps, AppState> {
    private readonly game: Game = Game.new({width: 30, height: 20});

    constructor(props) {
        super(props);

        this.state = {
            board: {
                width: this.game.getWidth(),
                height: this.game.getHeight(),
                isLives: this.getIsLives()
            }
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
                        <Board width={this.state.board.width} height={this.state.board.height}/>
                        <ControlPanel/>
                    </div>
                    <div className="App-Footer">
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    private getIsLives(): IsLivesState {
        return new Array(20).fill(0).map((_, y) =>
            new Array(30).fill(0).map((__, x) =>
                this.game.isLiveAt({x, y}))
        );
    }
}

export default App;
