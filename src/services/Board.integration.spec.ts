import * as path from "path";

import Board from './Board';
import boardBuilder from "./test-utils/boardBuilder";

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

        it(`should, for "board_neighbour_3x3_1.txt", return 1 for board.getNumOfLivingNeighboursAt({x: 1, y: 1})`, function () {
            // given
            let x = 1, y = 1, resFileName = "board_neighbour_3x3_1.txt";
            let expectedNum = 1;
            let board = boardBuilder.buildFromFile(path.normalize(`${__dirname}/test-resources/${resFileName}`));

            // when
            let numOfLivingNeighbours = board.getNumOfLivingNeighboursAt({x, y});

            // then
            expect(numOfLivingNeighbours).toEqual(expectedNum);

        });
    });
});