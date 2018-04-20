import {sinonTest} from '../test-utils/sinonWithTest';
import * as sinon from 'sinon';

import Board, {Cells} from './Board';
import Cell from './Cell';
import randomObjectGenerator from './utils/randomObjectGenerator';

describe('Board', function () {
    describe('factory methods', function () {
        describe('newBlank', function () {
            describe('Valid cases', function () {
                [
                    {width: 10, height: 20},
                    {width: 20, height: 10},
                ].forEach(({width, height}) =>
                    it(`should create a new board with width=${width} and height=${height}`, function () {
                        // given
                        let board = Board.newBlank({width, height});

                        // when
                        let board_width = board.getWidth();
                        let board_height = board.getHeight();

                        // then
                        expect(board_width).toEqual(width);
                        expect(board_height).toEqual(height);
                    })
                );
            });

            describe('Error cases', function () {
                it(`should throw Error when creating a new board with negative width`, function () {
                    // given
                    const negativeWidth = -10, height = 20;

                    // when
                    let invalidBoardConstruction = () => Board.newBlank({width: negativeWidth, height});

                    // then
                    expect(invalidBoardConstruction).toThrow(`Width (${negativeWidth}) must be be positive`);
                });

                it(`should throw Error when creating a new board with zero width`, function () {
                    // given
                    const zeroWidth = 0, height = 20;

                    // when
                    let invalidBoardConstruction = () => Board.newBlank({width: zeroWidth, height});

                    // then
                    expect(invalidBoardConstruction).toThrow(`Width (${zeroWidth}) must be be positive`);
                });

                it(`should throw Error when creating a new board with negative height`, function () {
                    // given
                    const width = 20, negativeHeight = -10;

                    // when
                    let invalidBoardConstruction = () => Board.newBlank({width, height: negativeHeight});

                    // then
                    expect(invalidBoardConstruction).toThrow(`Height (${negativeHeight}) must be be positive`);
                });

                it(`should throw Error when creating a new board with zero height`, function () {
                    // given
                    const width = 20, zeroHeight = 0;

                    // when
                    let invalidBoardConstruction = () => Board.newBlank({width, height: zeroHeight});

                    // then
                    expect(invalidBoardConstruction).toThrow(`Height (${zeroHeight}) must be be positive`);
                });
            });
        });

        describe('newFromCells', function () {
            describe('Valid cases', function () {
                it(`should be able to create a board from 1*1 cells`, function () {
                    // given
                    const cells: Cells = [[Cell.of({isLive: true})]];

                    // when
                    let board: Board = Board.newFromCells({cells});

                    // then
                    expect(board.getWidth()).toEqual(1);
                    expect(board.getHeight()).toEqual(1);
                    expect(board.isLiveAt({x: 0, y: 0})).toEqual(true);
                });

                it(`should be able to create a board from 1*2 cells`, function () {
                    // given
                    const cells: Cells = [[Cell.of({isLive: false}), Cell.of({isLive: true})]];

                    // when
                    let board: Board = Board.newFromCells({cells});

                    // then
                    expect(board.getWidth()).toEqual(2);
                    expect(board.getHeight()).toEqual(1);
                    expect(board.isLiveAt({x: 0, y: 0})).toEqual(false);
                    expect(board.isLiveAt({x: 1, y: 0})).toEqual(true);
                });
            });

            describe('Error cases', function () {
                it(`should throw Error when creating a new board from empty array`, function () {
                    // given
                    const cells: Cells = [];

                    // when
                    let invalidBoardConstruction = () => Board.newFromCells({cells});

                    // then
                    expect(invalidBoardConstruction).toThrow(`Cells (${JSON.stringify(cells)}) must not be empty`);
                });

                [
                    [[]],
                    [[], []],
                ].forEach(cells =>
                    it(`should throw Error when creating a new board from cells=${JSON.stringify(cells)} if all rows are empty`, function () {
                        // given

                        // when
                        let invalidBoardConstruction = () => Board.newFromCells({cells});

                        // then
                        expect(invalidBoardConstruction).toThrow(`At least one row out of the ${cells.length} rows must be non-empty so that width can be determined`);
                    })
                );
            });
        });
    });

    describe('isLiveAt', function () {
        it('should expose board.isLiveAt({x, y})', function () {
            // given
            const width = 1, height = 1;
            let board = Board.newBlank({width, height});

            // when
            let isLive = board.isLiveAt({x: 0, y: 0});

            // then
            expect(isLive).toEqual(false);
        });
    });

    describe('isSameAs', function () {
        it('should return true when comparing to the board itself', function () {
            // given
            const someDimension = {width: 1, height: 1};
            let board = Board.newBlank(someDimension);

            // when
            let isSameAs = board.isSameAs(board);

            // then
            expect(isSameAs).toEqual(true);
        });

        [
            {width: 2, height: 1},
            {width: 1, height: 2},
            {width: 2, height: 2},
        ].forEach(anotherDimension =>
            it(`should return false when comparing to a board with different dimension=${JSON.stringify(anotherDimension)}`, function () {
                // given
                const someDimension = {width: 1, height: 1};
                let board = Board.newBlank(someDimension), anotherBoard = Board.newBlank(anotherDimension);

                // when
                let isSameAs = board.isSameAs(anotherBoard);

                // then
                expect(isSameAs).toEqual(false);
            })
        );

        it('should return true if the two boards of same size has all same cell states', function () {
            // given
            const someDimension = {width: 1, height: 1};
            let board = Board.newBlank(someDimension), anotherBoard = Board.newBlank(someDimension);

            // when
            let isSameAs = board.isSameAs(anotherBoard);

            // then
            expect(isSameAs).toEqual(true);
        });

        it('should return false if the two boards of same size has some different cell states', function () {
            // given
            const someDimension = {width: 1, height: 1};
            const baseBoard = Board.newBlank(someDimension);
            let board = baseBoard.withLiveAt({x: 0, y: 0, isLive: true}),
                anotherBoard = baseBoard.withLiveAt({x: 0, y: 0, isLive: false});

            // when
            let isSameAs = board.isSameAs(anotherBoard);

            // then
            expect(isSameAs).toEqual(false);
        });
    });

    describe('withLiveAt', function () {
        it('should be able to set the cell to live by board.withLiveAt({x, y})', function () {
            // given
            const width = 1, height = 1;
            const x = 0, y = 0;
            const expectedIsLive = true;
            let board = Board.newBlank({width, height});

            // when
            let newBoard = board.withLiveAt({x, y, isLive: expectedIsLive});
            let isLive = newBoard.isLiveAt({x, y});

            // then
            expect(isLive).toEqual(expectedIsLive);
        });

        it('should not affect the old board', function () {
            // given
            const width = 2, height = 1;
            const x = 0, y = 0, isLive = true;
            let board = Board.newBlank({width, height});

            // when
            board.withLiveAt({x, y, isLive});

            // then
            expect(board.isLiveAt({x: 0, y: 0})).toEqual(false);
            expect(board.isLiveAt({x: 1, y: 0})).toEqual(false);
        });

        it('should not affect other cells by setting only one cell', function () {
            // given
            const width = 2, height = 1;
            const x = 0, y = 0, isLive = true;
            let board = Board.newBlank({width, height});

            // when
            let newBoard = board.withLiveAt({x, y, isLive});

            // then
            expect(newBoard.isLiveAt({x: 0, y: 0})).toEqual(isLive);
            expect(newBoard.isLiveAt({x: 1, y: 0})).toEqual(false);
        });
    });


    describe('newRandomized', function () {
        it('should get a new randomized board from board.newRandomized', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            this.stub(randomObjectGenerator, 'boolean')
                .onFirstCall().returns(false)
                .onSecondCall().returns(true)
                .onThirdCall().returns(false)
                .returns(true);

            const oldBoard = Board.newBlank({width: 2, height: 3});

            // when
            let board = oldBoard.newRandomized();

            // then
            let expectedCells = [
                [false, true],
                [false, true],
                [true, true],
            ];

            expectedCells.forEach((rows, y) =>
                rows.forEach((expectedIsLive, x) =>
                    // Unfortunately Jest does not support (a simple way for) customized assertion error message
                    // Thus using the alternative suggested here: https://github.com/facebook/jest/issues/3293#issuecomment-361037383
                    expect({
                        x, y,
                        isLive: board.isLiveAt({x, y})
                    })
                        .toEqual({
                            x, y,
                            isLive: expectedIsLive
                        })
                )
            );
        }));
    });

});