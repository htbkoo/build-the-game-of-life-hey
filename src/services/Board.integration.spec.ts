import Board from './Board';

describe("Board (Integration)", function () {
    describe('getNumOfLivingNeighboursAt', function () {
        it('should return 0 for empty board', function () {
            // given
            const width = 5, height = 4;
            const x = 2, y = 2;
            let board = new Board({width, height});

            // when
            let numOfLivingNeighbours = board.getNumOfLivingNeighboursAt({x, y});

            // then
            expect(numOfLivingNeighbours).toEqual(0);
        });
    });
});