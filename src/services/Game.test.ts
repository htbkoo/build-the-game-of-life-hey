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

        it('should increase generation by 1 for game.getNumGeneration() when game.proceed and board is not SameAs board.proceed', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const mockBoard = sinon.createStubInstance(Board), newBoard = sinon.createStubInstance(Board);
            mockBoard.isSameAs = sinon.stub().withArgs(newBoard).returns(false);
            const game = newGame.call(this, {mockBoard});

            const expectedInitialNumGeneration = 0;
            expect(game.getNumGeneration()).toEqual(expectedInitialNumGeneration);

            // when
            game.proceed();
            let numGeneration = game.getNumGeneration();

            // then
            expect(numGeneration).toEqual(expectedInitialNumGeneration + 1);
        }));

        it('should not increase generation for game.getNumGeneration() when game.proceed and board isSameAs board.proceed', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const mockBoard = sinon.createStubInstance(Board), newBoard = sinon.createStubInstance(Board);
            mockBoard.isSameAs = sinon.stub().withArgs(newBoard).returns(true);
            const game = newGame.call(this, {mockBoard});

            const expectedInitialNumGeneration = 0;
            expect(game.getNumGeneration()).toEqual(expectedInitialNumGeneration);

            // when
            game.proceed();
            let numGeneration = game.getNumGeneration();

            // then
            expect(numGeneration).toEqual(expectedInitialNumGeneration);
        }));

        it('should reset numGeneration to 0 for game.getNumGeneration() when game.reset', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const game = newGame.call(this);
            const givenNumGen = 1;
            game._numGen = givenNumGen;
            expect(game.getNumGeneration()).toEqual(givenNumGen);

            // when
            game.reset();
            let numGeneration = game.getNumGeneration();

            // then
            expect(numGeneration).toEqual(0);
        }));

        //    TODO: add more tests for different case to count generations / reset upon reset or randomize

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