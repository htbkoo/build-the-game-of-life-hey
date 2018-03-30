import {checkArgument} from "precond";

export default class Board {
    private _width: number;
    private _height: number;

    constructor({width, height}: { width: number; height: number }) {
        checkArgument(isPositve(width), `Width (${width}) must be be positive`);

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

function isPositve(num: number): boolean {
    return num > 0;
}