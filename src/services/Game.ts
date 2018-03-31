import Board from "./Board";

export default class Game {
    private _board: Board;

    constructor({width, height}: { width: number; height: number }) {
        this._board = new Board({width, height});
    }


}