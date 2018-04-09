import {sinonTest} from "../test-utils/sinonWithTest";
import * as sinon from "sinon";

import Game from './Game';
import Board from "./Board";

describe("Game", function () {
    describe("constructor", function () {
        it("should take {width, height}, create Board accordingly and expose game.getWidth() and game.getHeight() accordingly", function () {
            // given
            const width = 20, height = 30;

            // when
            let game = new Game({width, height});

            // then
            expect(game.getWidth()).toEqual(width);
            expect(game.getHeight()).toEqual(height);
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
            const mockBoard = sinon.createStubInstance(Board);
            mockBoard.evolve = sinon.stub().returns(mockNewBoard);

            let game = new Game({width: 1, height: 1});
            game["_board"] = mockBoard;

            // when
            game.proceed();

            // then
            expect(game["_board"]).toEqual(mockNewBoard);
        });
    });

    describe("randomize", function () {
        it("should randomize the states on the board upon game.randomize()", sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const mockNewBoard = Symbol("mockNewBoard");
            const mockBoard = sinon.createStubInstance(Board);
            mockBoard.newRandomized = sinon.stub().returns(mockNewBoard);

            let game = new Game({width: 1, height: 1});
            game["_board"] = mockBoard;

            // when
            game.randomize();

            // then
            expect(game["_board"]).toEqual(mockNewBoard);
        }));
    });
});