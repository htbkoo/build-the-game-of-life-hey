import Board, {BoardCoordinates, BoardDimension} from './Board';

export default class Game {
    private _board: Board;
    private _numGen: number;

    // constructors
    private constructor(dimension: BoardDimension) {
        this._board = Board.newBlank(dimension);
        this._numGen = 0;
    }

    // factory methods
    static new(dimension: BoardDimension): Game {
        return new Game(dimension);
    }

    // getters
    isLiveAt(coors: BoardCoordinates): boolean {
        return this._board.isLiveAt(coors);
    }

    getWidth(): number {
        return this._board.getWidth();
    }

    getHeight(): number {
        return this._board.getHeight();
    }

    getNumGeneration() {
        return this._numGen;
    }

    // mutators
    toggleLiveAt(coors: BoardCoordinates) {
        let toggledIsLive = !this.isLiveAt(coors);
        this._board = this._board.withLiveAt({...coors, isLive: toggledIsLive});
        return toggledIsLive;
    }

    reset() {
        let width = this._board.getWidth(), height = this._board.getHeight();
        this._board = Board.newBlank({width, height});
    }

    proceed() {
        const newBoard = this._board.evolve();
        if (!this._board.isSameAs(newBoard)) {
            this._numGen++;
        }
        this._board = newBoard;
    }

    randomize() {
        this._board = this._board.newRandomized();
    }
}