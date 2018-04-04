import Board, {Cells} from './Board';
import Cell from "./Cell";

describe("Board", function () {
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

        describe('newFrom', function () {
            describe('Valid cases', function () {
                it(`should be able to create a board from cells`, function () {
                    // given
                    const cells: Cells = [[new Cell({isLive: true})]];

                    // when
                    let board: Board = Board.newFrom({cells});

                    // then
                    expect(board.getWidth()).toEqual(1);
                    expect(board.getHeight()).toEqual(1);
                    expect(board.isLiveAt({x: 0, y: 0})).toEqual(true);
                });
            });

            describe('Error cases', function () {
                it(`should throw Error when creating a new board from empty array`, function () {
                    // given
                    const cells: Cells = [];

                    // when
                    let invalidBoardConstruction = () => Board.newFrom({cells});

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
                        let invalidBoardConstruction = () => Board.newFrom({cells});

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

    describe('setLiveAt', function () {
        it('should be able to set the cell to live by board.setLiveAt({x, y})', function () {
            // given
            const width = 1, height = 1;
            const x = 0, y = 0;
            const expectedIsLive = true;
            let board = Board.newBlank({width, height});

            // when
            board.setLiveAt({x, y, isLive: expectedIsLive});
            let isLive = board.isLiveAt({x, y});

            // then
            expect(isLive).toEqual(expectedIsLive);
        });

        it('should not affect other cells by setting only one cell', function () {
            // given
            const width = 2, height = 1;
            const x = 0, y = 0, isLive = true;
            let board = Board.newBlank({width, height});

            // when
            board.setLiveAt({x, y, isLive});

            // then
            expect(board.isLiveAt({x: 0, y: 0})).toEqual(isLive);
            expect(board.isLiveAt({x: 1, y: 0})).toEqual(false);
        });
    });
});