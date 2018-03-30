import {checkArgument} from "precond";
import Cell from "./Cell";

export default class Board {
    private _width: number;
    private _height: number;
    // cell representation: upper-left = (0,0), first number is x which corresponds to the width
    private _cells: Array<Array<Cell>>;

    constructor({width, height}: { width: number; height: number }) {
        checkArgument(isPositive(width), `Width (${width}) must be be positive`);
        checkArgument(isPositive(height), `Height (${height}) must be be positive`);

        this._width = width;
        this._height = height;

        this._cells = createCells(width, height);
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    isLiveAt({x, y}: { x: number; y: number }): boolean {
        return this._cells[x][y].isLive();
    }

    setLiveAt({x, y, isLive}: { x: number; y: number, isLive: boolean }) {
        this._cells[x][y] = new Cell({isLive});
    }

    getNumOfLivingNeighboursAt({x, y}: { x: number; y: number }) {
        return 0;
    }
}

function isPositive(num: number): boolean {
    return num > 0;
}

function createCells(width: number, height: number) {
    return new Array(width).fill(0).map(() =>
        new Array(height).fill(0).map(() => new Cell({isLive: false}))
    );
}
