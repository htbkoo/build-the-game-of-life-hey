import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';
import Game from '../services/Game';
import TimeTicker from './TimeTickerComponent';
import {BoardCoordinates, BoardDimension} from '../services/Board';

import './css/App.css';

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

        this.game = App.newRandomizedGame(props.initialDimension);

        this.state = {
            isPlaying: true,
            board: this.getBoardState()
        };

        this.proceedGame = this.proceedGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.randomizeGame = this.randomizeGame.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
        this.toggleCellAt = this.toggleCellAt.bind(this);
    }

    private static newRandomizedGame(dimension: BoardDimension): Game {
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

    togglePlaying() {
        let toggledIsPlaying = !this.state.isPlaying;
        this.setState({
            isPlaying: toggledIsPlaying
        });
    }

    toggleCellAt(coordinates: BoardCoordinates) {
        this.updateGameBy('toggleLiveAt', [coordinates]);
    }

    render() {
        let optionalTimeTicker = this.state.isPlaying
            ? (
                <TimeTicker
                    onTick={this.proceedGame}
                />
            )
            : '';

        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-Header">
                        <AppBar title="Hey's Game of Life (ReactJs + TypeScript)" className="App-Header-AppBar"/>
                    </div>
                    <div className="App-Body">
                        <Board
                            board={this.state.board}
                            onCellClick={this.toggleCellAt}
                        />
                        {optionalTimeTicker}
                    </div>
                    <div className="App-Footer">
                        <ControlPanel
                            onProceedClick={this.proceedGame}
                            onResetClick={this.resetGame}
                            onRandomizeClick={this.randomizeGame}
                            onPlayToggle={this.togglePlaying}
                            isPlaying={this.state.isPlaying}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    private getBoardState(): BoardState {
        let width = this.game.getWidth();
        let height = this.game.getHeight();
        return {
            width,
            height,
            isLives: this.getIsLives(width, height)
        };
    }

    private getIsLives(width, height): IsLivesState {
        return new Array(height).fill(0).map((_, y) =>
            new Array(width).fill(0).map((__, x) =>
                this.game.isLiveAt({x, y}))
        );
    }

    private updateGameBy(method, args: Array<any> = []) {
        this.game[method](...args);
        this.setState({
            board: this.getBoardState()
        });
    }
}

export default App;
