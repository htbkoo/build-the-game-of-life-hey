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
    });
    });
});