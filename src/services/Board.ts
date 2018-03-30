export default class Board {
    private _width: number;
    private _height: number;

    constructor({width, height}: { width: number; height: number }) {
        this._width = width;
        this._height = height;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }
}