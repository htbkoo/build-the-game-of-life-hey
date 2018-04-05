import Board from "./Board";
import BoardCoordinates from "./BoardCoordinates";

export default class Game {
    private _board: Board;

    constructor(dimension: { width: number; height: number }) {
        this._board = Board.newBlank(dimension);
    }

    isLiveAt(coors: BoardCoordinates): boolean {
        return this._board.isLiveAt(coors);
    }

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
}