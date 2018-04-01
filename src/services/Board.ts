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
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                if (this._cells[wrapCoordinate(x + dx, this._width)][wrapCoordinate(y + dy, this._height)].isLive()) {
                    count++;
                }
            }
        }

        return count;
    }

    evolve(): Board {
        let newBoard = new Board({width: this.getWidth(), height: this.getHeight()});

        for (let y = 0; y < this.getHeight(); y++) {
            for (let x = 0; x < this.getWidth(); x++) {
                newBoard.setLiveAt({x, y, isLive: this.willBeLive({x, y})});
            }
        }

        return newBoard;
    }

    private willBeLive(coors: { x: number; y: number }): boolean {
        let numOfLivingNeighbours = this.getNumOfLivingNeighboursAt(coors);
        if (this.isLiveAt(coors)) {
            return shouldKeepLiving();
        } else {
            return shouldReproduce();
        }

        function shouldKeepLiving() {
            return numOfLivingNeighbours >= 2 && numOfLivingNeighbours <= 3;
        }

        function shouldReproduce() {
            return numOfLivingNeighbours === 3;
        }
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

function wrapCoordinate(coordinate: number, size: number): number {
    if (coordinate < 0) {
        return size - 1;
    } else if (coordinate >= size) {
        return 0;
    }
    return coordinate;
}