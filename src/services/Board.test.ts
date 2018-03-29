import Board from './Board';

describe("Board", function () {
    it("should create a new board with width and height", function () {
        // given
        const width = 10, height = 20;
        let board = new Board({width, height});

        // when
        let board_width = board.getWidth();
        let board_height = board.getHeight();

        // then
        expect(board_width).toEqual(width);
        expect(board_height).toEqual(height);
    });
});