import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

import './css/App.css';
import Game from '../services/Game';
// To avoid the "TS7016: Could not find a declaration file for module" error
// reference: https://stackoverflow.com/a/42505940
// const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

type AppProps = {
    initialDimension: BoardDimension
};

type AppState = {
    isPlaying: boolean,
    board: BoardState
};

type BoardDimension = {
    width: number,
    height: number
};

export type BoardState = {
    width: number,
    height: number,
    isLives: IsLivesState
};

export type IsLivesState = ReadonlyArray<ReadonlyArray<boolean>>;

class App extends React.Component<AppProps, AppState> {
    private readonly game: Game;

    constructor(props) {
        super(props);

        this.game = App.newRandomizedGame({width: 30, height: 20});

        this.state = {
            isPlaying: false,
            board: this.getBoardState()
        };

        this.proceedGame = this.proceedGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.randomizeGame = this.randomizeGame.bind(this);
        this.startPlaying = this.startPlaying.bind(this);
    }

    private static newRandomizedGame(dimension): Game {
        let game = Game.new(dimension);
        game.randomize();
        return game;
    }

    proceedGame() {
        console.log('should proceed');
        this.updateGameBy('proceed');
    }

    resetGame() {
        console.log('should reset');
        this.updateGameBy('reset');
    }

    randomizeGame() {
        console.log('should randomize');
        this.updateGameBy('randomize');
    }

    startPlaying() {
        this.setState({
            isPlaying: true
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-Header">
                        <AppBar title="Hey's Game of Life (ReactJs + TypeScript)" className="App-Header-AppBar"/>
                    </div>
                    <div className="App-Body">
                        <Board board={this.state.board}/>
                    </div>
                    <div className="App-Footer">
                        <ControlPanel
                            onProceedClick={this.proceedGame}
                            onResetClick={this.resetGame}
                            onRandomizeClick={this.randomizeGame}
                            onPlayClick={this.startPlaying}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    private getBoardState(): BoardState {
        return {
            width: this.game.getWidth(),
            height: this.game.getHeight(),
            isLives: this.getIsLives()
        };
    }

    private getIsLives(): IsLivesState {
        return new Array(20).fill(0).map((_, y) =>
            new Array(30).fill(0).map((__, x) =>
                this.game.isLiveAt({x, y}))
        );
    }

    private updateGameBy(method) {
        this.game[method]();
        this.setState({
            board: this.getBoardState()
        });
    }
}

export default App;
