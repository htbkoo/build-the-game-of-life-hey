import {checkArgument} from 'precond';

import Cell from './Cell';
import randomObjectGenerator from './utils/randomObjectGenerator';

export type Cells = ReadonlyArray<ReadonlyArray<Cell>>; // Cells representation: upper-left = (0,0), first number is x which corresponds to the width
export type BoardCoordinates = { x: number; y: number };
export type BoardDimension = { width: number, height: number };

export default class Board {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _cells: Cells;

    private constructor({width, height, cells}: { width: number; height: number, cells: Cells }) {
        this._width = width;
        this._height = height;
        this._cells = cells;
    }

    /* Factory methods */
    static newBlank({width, height}: BoardDimension): Board {
        checkArgument(isPositive(width), `Width (${width}) must be be positive`);
        checkArgument(isPositive(height), `Height (${height}) must be be positive`);

        return new Board({width, height, cells: createCells(width, height)});
    }

    static newFromCells({cells}: { cells: Cells }): Board {
        checkArgument(isNotEmpty(cells), `Cells (${JSON.stringify(cells)}) must not be empty`);
        checkArgument(haveNonEmptyRows(cells), `At least one row out of the ${cells.length} rows must be non-empty so that width can be determined`);

        let height = cells.length, width = cells[0].length;
        return new Board({width, height, cells});
    }

    /* Getters */
    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    isLiveAt(coors: BoardCoordinates): boolean {
        return this.getCell(coors).isLive();
    }

    getNumOfLivingNeighboursAt({x, y}: BoardCoordinates) {
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

    /* New Instance Getter with updated fields */
    withLiveAt({x, y, isLive}: { x: number; y: number, isLive: boolean }): Board {
        return Board.newFromCells({
            cells: this._cells.map((row, cy) =>
                row.map((cell, cx) =>
                    (x === cx && y === cy) ? Cell.of({isLive}) : cell
                )
            )
        });
    }

    evolve(): Board {
        let cells = this._cells.map((row, y) =>
            row.map((cell, x) =>
                Cell.of({isLive: this.willBeLive({x, y})})
            )
        );

        return Board.newFromCells({cells});
    }

    newRandomized(): Board {
        let cells = this._cells.map((row) =>
            row.map(() =>
                Cell.of({isLive: randomObjectGenerator.boolean()})
            )
        );

        return Board.newFromCells({cells});
    }

    private willBeLive(coors: BoardCoordinates): boolean {
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

    private getCell({x, y}: BoardCoordinates) {
        return this._cells[y][x];
    }

    isSameAs(board: Board) {
        return (this.getWidth() === board.getWidth()) && (this.getHeight() === board.getHeight());
    }
}

function isPositive(num: number): boolean {
    return num > 0;
}

function isNotEmpty(cells: Cells): boolean {
    return cells.length > 0;
}

function haveNonEmptyRows(cells: Cells): boolean {
    return cells.some(row => row.length > 0);
}

function createCells(width: number, height: number) {
    return new Array(height).fill(0).map(() =>
        new Array(width).fill(0).map(() => Cell.DEAD)
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