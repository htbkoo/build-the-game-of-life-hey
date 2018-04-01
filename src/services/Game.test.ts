import Game from './Game';
import * as sinon from "sinon";
import Board from "./Board";

describe("Game", function () {
    describe("constructor", function () {
        it("should take {width, height} and create Board accordingly", function () {
            // given
            const width = 20, height = 30;

            // when
            let game = new Game({width, height});

            // then
            expect(game["_board"].getWidth()).toEqual(width);
            expect(game["_board"].getHeight()).toEqual(height);
        });
    });

    describe("isLiveAt", function () {
        it("should expose isLiveAt", function () {
            // given
            const width = 20, height = 30;

            // when
            let game = new Game({width, height});

            // then
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    expect(game.isLiveAt({x, y})).toEqual(false);
                }
            }
        });
    });

    describe("proceed", function () {
        it("should set game._board to board.evolve() upon game.proceed()", function () {
            // given
            const mockNewBoard = Symbol("mockNewBoard");
            // let game = sinon.createStubInstance(Game);
            let game = new Game({width: 1, height: 1});
            let mockBoardEvolve = jest.fn();
            mockBoardEvolve.mockReturnValue(mockNewBoard);
            // Object.defineProperty(game, "_board", {"evolve": mockBoardEvolve});
            // game["_board"] = {"evolve": mockBoardEvolve};

            let board = sinon.createStubInstance(Board);
            board.evolve = sinon.stub().returns(mockNewBoard);
            game["_board"] = board;

            // when
            game.proceed();

            // then
            expect(game["_board"]).toEqual(mockNewBoard);
        });
    });
});