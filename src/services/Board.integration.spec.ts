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

        [
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_1.txt", expectedNum: 1}
        ].forEach(({x, y, testCaseFileName, expectedNum}) =>
            it(`should, for "${testCaseFileName}", return ${expectedNum} for board.getNumOfLivingNeighboursAt({x: ${x}, y: ${y}})`, function () {
                // given
                let board = boardBuilder.buildFromFile(path.normalize(`${__dirname}/test-resources/board/${testCaseFileName}`));

                // when
                let numOfLivingNeighbours = board.getNumOfLivingNeighboursAt({x, y});

                // then
                expect(numOfLivingNeighbours).toEqual(expectedNum);

            }));
    });
});