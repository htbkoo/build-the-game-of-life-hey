import {checkArgument} from "precond";

export default class Board {
    private _width: number;
    private _height: number;
    private _isLive: boolean = false;

    constructor({width, height}: { width: number; height: number }) {
        checkArgument(isPositive(width), `Width (${width}) must be be positive`);
        checkArgument(isPositive(height), `Height (${height}) must be be positive`);

        this._width = width;
        this._height = height;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    isLiveAt({x, y}: { x: number; y: number }): boolean {
        return this._isLive;
    }

    setLiveAt(isLive: boolean) {
        this._isLive = isLive;

    }
}

function isPositive(num: number): boolean {
    return num > 0;
}