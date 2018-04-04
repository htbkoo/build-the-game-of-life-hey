import {checkArgument} from "precond";
import Cell from "./Cell";

export type Cells = Array<Array<Cell>>;

export default class Board {
    private readonly _width: number;
    private readonly _height: number;
    // cell representation: upper-left = (0,0), first number is x which corresponds to the width
    private readonly _cells: Cells;

    private constructor({width, height, cells}: { width: number; height: number, cells: Cells }) {
        this._width = width;
        this._height = height;
        this._cells = cells;
    }

    static newBlank({width, height}: { width: number; height: number }): Board {
        checkArgument(isPositive(width), `Width (${width}) must be be positive`);
        checkArgument(isPositive(height), `Height (${height}) must be be positive`);

        return new Board({width, height, cells: createCells(width, height)});
    }

    static newFrom({cells}: { cells: Cells }): Board {
        checkArgument(isNotEmpty(cells), `Cells (${JSON.stringify(cells)}) must not be empty`);

        let width = cells.length, height = cells[0].length;
        return new Board({width, height, cells});
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    isLiveAt(coors: { x: number; y: number }): boolean {
        return this.getCell(coors).isLive();
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

                let targetCoors = {
                    x: wrapCoordinate(x + dx, this._width),
                    y: wrapCoordinate(y + dy, this._height)
                };
                if (this.getCell(targetCoors).isLive()) {
                    count++;
                }
            }
        }

        return count;
    }

    evolve(): Board {
        let newBoard = Board.newBlank({width: this.getWidth(), height: this.getHeight()});

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

    private getCell({x, y}: { x: number; y: number }) {
        return this._cells[x][y];
    }
}

function isPositive(num: number): boolean {
    return num > 0;
}

function isNotEmpty(cells: Cells): boolean {
    return cells.length > 0;
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