import * as React from 'react';
import {shallow} from 'enzyme';
import {sinon, sinonTest} from '../test-utils/sinonWithTest';

import App, {BoardState} from './App';

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';
import Game from '../services/Game';

describe('App', function () {
    describe('initialization', function () {
        it('should have a <Board/> and <ControlPanel/>', () => {
            // given
            // when
            let app = shallowApp();

            // then
            expect(app.find(Board).length).toEqual(1);
            expect(app.find(ControlPanel).length).toEqual(1);
        });
    });

    describe('state', function () {
        it('should pass state.board as props to <Board/>', () => {
            // given
            const width = 10, height = 50;
            const boardState = {width, height};
            const app = shallowApp();

            // when
            app.setState({board: {width, height}});

            // then
            expect(app.find(Board).prop('board')).toEqual(boardState);
        });

        it('should have a new game and randomized and state.board.isLives according to the game state', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const width = 30, height = 20;
            const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

            // when
            const app = createAppInstanceWithMockGame.call(this, width, height, 'randomize', getIsLiveBefore, getIsLiveAfter);
            const controlPanel = app.find(ControlPanel);

            // then
            assertBoardState(height, width, app.state('board'), getIsLiveAfter);
        }));
    });

    describe('handlers', function () {
        describe('onProceedClick', function () {
            it('should call game.proceed() and set to next state when <ControlPanelComponent/>.props.onProceedClick()', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20;
                const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this, width, height, 'proceed', getIsLiveBefore, getIsLiveAfter);

                assertBoardState(height, width, app.state('board'), getIsLiveBefore);

                // when
                const controlPanel = app.find(ControlPanel);
                let onProceedClick = controlPanel.prop('onProceedClick');
                onProceedClick();

                // then
                assertBoardState(height, width, app.state('board'), getIsLiveAfter);
            }));
        });

        describe('onResetClick', function () {
            it('should call game.reset() and set to next state when <ControlPanelComponent/>.props.onResetClick()', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20;
                const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this, width, height, 'reset', getIsLiveBefore, getIsLiveAfter);

                assertBoardState(height, width, app.state('board'), getIsLiveBefore);

                // when
                const controlPanel = app.find(ControlPanel);
                let onRestClick = controlPanel.prop('onResetClick');
                onRestClick();

                // then
                assertBoardState(height, width, app.state('board'), getIsLiveAfter);
            }));
        });

        describe('onRandomizeClick', function () {
            it('should call game.randomize() and set to next state when <ControlPanelComponent/>.props.onRandomizeClick()', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20;

                // necessary for the signature
                // noinspection JSUnusedLocalSymbols
                let initialized = false;
                let getIsLive = (coor) => false;
                const randomize = () => {
                    if (initialized) {
                        getIsLive = ({x, y}) => x === y;
                    }
                };
                const mockGame = createMockGame(width, height, {
                    isLiveAt(coor) {
                        return getIsLive(coor);
                    },
                    randomize
                });
                this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

                const app = shallowApp(withDimension(width, height));

                assertBoardState(height, width, app.state('board'), () => false);
                initialized = true;

                // when
                const controlPanel = app.find(ControlPanel);
                let onRandomizeClick = controlPanel.prop('onRandomizeClick');
                onRandomizeClick();

                // then
                assertBoardState(height, width, app.state('board'), ({x, y}) => x === y);
            }));
        });

        describe('onPlayClick', function () {
            it('should update state.isPlaying to true when <ControlPanelComponent/>.props.onPlayClick()', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const ANY_NUMBER = 1;
                // TODO: clean up
                const app = createAppInstanceWithMockGame.call(this, ANY_NUMBER, ANY_NUMBER, 'reset');
                expect(app.state('isPlaying')).toEqual(false);

                // when
                const controlPanel = app.find(ControlPanel);
                let onPlayClick = controlPanel.prop('onPlayClick');
                onPlayClick();

                // then
                expect(app.state('isPlaying')).toEqual(true);
            }));
        });
    });

    function shallowApp(initialDimension = {width: 30, height: 20}) {
        return shallow(<App initialDimension={initialDimension}/>);
    }

    function withDimension(width: number, height: number) {
        return {width, height};
    }

    // necessary for the signature
    // noinspection JSUnusedLocalSymbols
    function createAppInstanceWithMockGame(this: sinon.SinonSandbox, width, height, methodName, getIsLive = (coor) => false, getIsLiveAfter = ({x, y}) => x === y) {
        const mockGame = createMockGame(width, height, {
            isLiveAt(coor) {
                return getIsLive(coor);
            },
            [methodName]: () => {
                getIsLive = getIsLiveAfter;
            }
        });
        // TODO: clean up
        // this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);
        this.stub(Game, 'new').returns(mockGame);

        return shallowApp(withDimension(width, height));
    }

    function assertBoardState(height: number, width: number, boardState: BoardState, getExpectedIsLive: (coor) => boolean) {
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                expect({x, y, isLive: boardState.isLives[y][x]}).toEqual({x, y, isLive: getExpectedIsLive({x, y})});
            }
        }
    }

    function createMockGame(width: number, height: number, additionalMethods = {}) {
        const baseMockGame = sinon.createStubInstance(Game);
        const defaultOverriddenMethods = {
            getWidth() {
                return width;
            },
            getHeight() {
                return height;
            }
        };

        return Object.assign(baseMockGame, defaultOverriddenMethods, additionalMethods);
    }
});