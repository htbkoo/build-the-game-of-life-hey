import * as path from "path";

import Board from './Board';
import boardUtils from "./test-utils/boardUtils";
import BoardCoordinates from "./BoardCoordinates";

describe("Board (Integration)", function () {
    describe('getNumOfLivingNeighboursAt', function () {
        it('should return 0 for empty board', function () {
            // given
            const width = 5, height = 4;
            const x = 2, y = 2;
            let board = Board.newBlank({width, height});

            // when
            let numOfLivingNeighbours = board.getNumOfLivingNeighboursAt(BoardCoordinates.of({x, y}));

            // then
            expect(numOfLivingNeighbours).toEqual(0);
        });

        [
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_1.txt", expectedNum: 1},
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_1b.txt", expectedNum: 1},
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_2.txt", expectedNum: 2},
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_8.txt", expectedNum: 8},
            {x: 1, y: 1, testCaseFileName: "board_neighbour_3x3_8b.txt", expectedNum: 8},
        ].forEach(({x, y, testCaseFileName, expectedNum}) =>
            it(`should, for "${testCaseFileName}", return ${expectedNum} for board.getNumOfLivingNeighboursAt({x: ${x}, y: ${y}})`, function () {
                // given
                let board = boardUtils.buildFromFile(asResourcePath(testCaseFileName));

                // when
                let numOfLivingNeighbours = board.getNumOfLivingNeighboursAt(BoardCoordinates.of({x, y}));

                // then
                expect(numOfLivingNeighbours).toEqual(expectedNum);
            }));

        it("should compute all numOfLivingNeighboursAt correctly for board_neighbour_full case", function () {
            // given
            let board = boardUtils.buildFromFile(asResourcePath("board_neighbour_full.txt"));
            let expectedNumbers = boardUtils.readFileToLines(asResourcePath("board_neighbour_full_expected.txt"));

            // when
            let actualNumbers = new Array(board.getHeight()).fill(0).map((_, y) =>
                new Array(board.getWidth()).fill(0).map((_, x) => board.getNumOfLivingNeighboursAt(BoardCoordinates.of({
                    x,
                    y
                }))).join("")
            );

            // then
            expect(actualNumbers).toEqual(expectedNumbers);
        });
    });

    describe("evolve", function () {
        [
            {
                prevStateFileName: "board_evolve_blinker_5x5_1.txt",
                nextStateFileName: "board_evolve_blinker_5x5_2.txt"
            },
            {
                prevStateFileName: "board_evolve_beacon_6x6_1.txt",
                nextStateFileName: "board_evolve_beacon_6x6_2.txt"
            },
        ].forEach(({prevStateFileName, nextStateFileName}) => {
            it(`should evolve from ${prevStateFileName} to ${nextStateFileName} and get new Board `, function () {
                // given
                let board = boardUtils.buildFromFile(asResourcePath(prevStateFileName));

                // when
                let newBoard = board.evolve();

                // then
                // TODO: refactor - this duplicate with the code in Board.integration.spec.ts "should compute all numOfLivingNeighboursAt correctly for board_neighbour_full case" test
                let actualCells = new Array(newBoard.getHeight()).fill(0).map((_, y) =>
                    new Array(newBoard.getWidth()).fill(0).map((_, x) => newBoard.isLiveAt(BoardCoordinates.of({
                        x,
                        y
                    })) ? 'l' : 'd').join("")
                );
                let expectedCells = boardUtils.readFileToLines(asResourcePath(nextStateFileName));

                expect(actualCells).toEqual(expectedCells);
            });

            it(`should not impact original board by board.evolve()`, function () {
                // given
                let board = boardUtils.buildFromFile(asResourcePath(prevStateFileName));

                // when
                board.evolve();

                // then
                // TODO: refactor - this duplicate with the code in Board.integration.spec.ts "should compute all numOfLivingNeighboursAt correctly for board_neighbour_full case" test
                let actualCells = new Array(board.getHeight()).fill(0).map((_, y) =>
                    new Array(board.getWidth()).fill(0).map((_, x) => board.isLiveAt(BoardCoordinates.of({
                        x,
                        y
                    })) ? 'l' : 'd').join("")
                );
                let expectedCells = boardUtils.readFileToLines(asResourcePath(prevStateFileName));

                expect(actualCells).toEqual(expectedCells);
            });
        });
    });

    function asResourcePath(fileName: string) {
        return path.normalize(`${__dirname}/test-resources/board/${fileName}`);
    }
});