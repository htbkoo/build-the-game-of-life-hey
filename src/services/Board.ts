import {checkArgument} from "precond";
import Cell from "./Cell";

export default class Board {
    private _width: number;
    private _height: number;

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

    isLiveAt({x, y}: { x: number; y: number }):boolean {
        return false;
    }
}

function isPositive(num: number): boolean {
    return num > 0;
}