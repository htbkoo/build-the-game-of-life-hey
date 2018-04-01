import * as React from 'react';
import './App.css';
import Board from './components/BoardComponent';
import Game from './services/Game';

type IsLives = Array<Array<boolean>>;
export type OnCellClick = (coors: { x: number, y: number }) => void;

interface AppProps {
    /* declare your component's props here */
}

interface AppState {
    width: number;
    height: number;
    isLives: IsLives;
}

class App extends React.Component<AppProps, AppState> {
    private readonly _game: Game;

    constructor(props: AppProps, context: any) {
        super(props, context);

        const width = 20, height = 20;
        this._game = new Game({width, height});

        this.state = {
            width,
            height,
            isLives: [[]]
        };

        this.onCellClick = this.onCellClick.bind(this);
        this.onProceedClick = this.onProceedClick.bind(this);
        this.getIsLives = this.getIsLives.bind(this);
    }

    componentWillMount() {
        this.setState({isLives: this.getIsLives()});
    }

    onCellClick(coors: { x: number, y: number }) {
        this._game.toggleLiveAt(coors);
        this.setState({isLives: this.getIsLives()});
    }

    onProceedClick(event) {
        this._game.proceed();
        this.setState({isLives: this.getIsLives()});
    }

    getIsLives(): IsLives {
        return new Array(this.state.height).fill(0).map((_, y) =>
            new Array(this.state.width).fill(0).map((_, x) =>
                this._game.isLiveAt({x, y})
            )
        );
    }

    render() {
        return (
            <div className="App">
                <Board width={this.state.width} height={this.state.height} isLives={this.state.isLives}
                       onCellClick={this.onCellClick}/>
                <button onClick={this.onProceedClick}>Proceed</button>
            </div>
        );
    }
}

export default App;
