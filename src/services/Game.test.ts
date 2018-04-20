import {sinonTest} from '../test-utils/sinonWithTest';
import * as sinon from 'sinon';

import Game from './Game';
import Board from './Board';

describe('Game', function () {
    describe('proceed', function () {
        it('should set game._board to board.evolve() upon game.proceed()', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const mockNewBoard = Symbol('mockNewBoard');
            const mockBoard = sinon.createStubInstance(Board);
            mockBoard.evolve = sinon.stub().returns(mockNewBoard);

            const game = newGame.call(this, {mockBoard});

            // when
            game.proceed();

            // then
            expect(game['_board']).toEqual(mockNewBoard);
        }));
    });

    describe('randomize', function () {
        it('should randomize the states on the board upon game.randomize()', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const mockNewBoard = Symbol('mockNewBoard');
            const mockBoard = sinon.createStubInstance(Board);
            mockBoard.newRandomized = sinon.stub().returns(mockNewBoard);

            const game = newGame.call(this, {mockBoard});

            // when
            game.randomize();

            // then
            expect(game['_board']).toEqual(mockNewBoard);
        }));
    });

    describe('getNumGeneration', function () {
        it('should return 0 for game.getNumGeneration() when newly created', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const game = newGame.call(this);

            // when
            let numGeneration = game.getNumGeneration();

            // then
            expect(numGeneration).toEqual(0);
        }));
    });

    const GAME_DEFAULTS = {
        mockBoard: undefined,
        dimension: {width: 1, height: 1}
    };

    function newGame(this: sinon.SinonSandbox, {mockBoard, dimension = GAME_DEFAULTS.dimension} = GAME_DEFAULTS) {
        mockBoard = mockBoard ? mockBoard : sinon.createStubInstance(Board);
        this.stub(Board, 'newBlank').withArgs(dimension).returns(mockBoard);

        return Game.new(dimension);
    }
});