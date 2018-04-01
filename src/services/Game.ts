import Board from "./Board";

export default class Game {
    private _board: Board;

    constructor(dimension: { width: number; height: number }) {
        this._board = new Board(dimension);
    }


    isLiveAt(coors: { x: number; y: number }): boolean {
        return this._board.isLiveAt(coors);
    }

    toggleLiveAt(coors: { x: number; y: number }) {
        let toggledIsLive = !this.isLiveAt(coors);
        this._board.setLiveAt({...coors, isLive: toggledIsLive});
        return toggledIsLive;
    }

    reset() {
        let width = this._board.getWidth(),  height = this._board.getHeight();
        this._board = new Board({width, height});
    }

    proceed(){
        this._board = this._board.evolve();
    }
}