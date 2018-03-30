import Board from './Board';

describe("Board", function () {
    describe('Constructor', function () {
        describe('Valid cases', function () {
            [
                {width: 10, height: 20},
                {width: 20, height: 10},
            ].forEach(({width, height}) =>
                it(`should create a new board with width=${width} and height=${height}`, function () {
                    // given
                    let board = new Board({width, height});

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
                let invalidBoardConstruction = () => new Board({width: negativeWidth, height});

                // then
                expect(invalidBoardConstruction).toThrow(`Width (${negativeWidth}) must be be positive`);
            });

            it(`should throw Error when creating a new board with zero width`, function () {
                // given
                const zeroWidth = 0, height = 20;

                // when
                let invalidBoardConstruction = () => new Board({width: zeroWidth, height});

                // then
                expect(invalidBoardConstruction).toThrow(`Width (${zeroWidth}) must be be positive`);
            });

            it(`should throw Error when creating a new board with negative height`, function () {
                // given
                const width = 20, negativeHeight = -10;

                // when
                let invalidBoardConstruction = () => new Board({width, height: negativeHeight});

                // then
                expect(invalidBoardConstruction).toThrow(`Height (${negativeHeight}) must be be positive`);
            });

            it(`should throw Error when creating a new board with zero height`, function () {
                // given
                const width = 20, zeroHeight = 0;

                // when
                let invalidBoardConstruction = () => new Board({width, height: zeroHeight});

                // then
                expect(invalidBoardConstruction).toThrow(`Height (${zeroHeight}) must be be positive`);
            });
        });
    });
});