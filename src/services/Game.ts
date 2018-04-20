import Board, {BoardCoordinates, BoardDimension} from './Board';

export default class Game {
    private _board: Board;

    // constructors
    private constructor(dimension: BoardDimension) {
        this._board = Board.newBlank(dimension);
    }

    // factory methods
    static new(dimension: BoardDimension): Game{
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
        return 0;
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
        this._board = this._board.evolve();
    }

    randomize() {
        this._board = this._board.newRandomized();
    }
}