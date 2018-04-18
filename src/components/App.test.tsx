import * as React from 'react';
import {shallow} from 'enzyme';
import {sinon, sinonTest} from '../test-utils/sinonWithTest';

import App, {BoardState} from './App';

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';
import Game from '../services/Game';
import TimeTicker from './TimeTickerComponent';

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
            const app = shallowApp();

            // when
            const width = 10, height = 50;
            app.setState({board: {width, height}});

            // then
            const boardState = {width, height};
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

        describe('isPlaying', function () {
            [
                {fromState: false, toState: true},
                {fromState: true, toState: false}
            ].forEach(({fromState, toState}) =>
                it(`should update state.isPlaying from ${fromState} to ${toState} when <ControlPanelComponent/>.props.onPlayToggle()`, sinonTest(function (this: sinon.SinonSandbox) {
                    // given
                    const app = createAppInstanceWithMockGame.call(this);
                    app.setState({isPlaying: fromState});

                    // when
                    const controlPanel = app.find(ControlPanel);
                    let onPlayToggle = controlPanel.prop('onPlayToggle');
                    onPlayToggle();

                    // then
                    expect(app.state('isPlaying')).toEqual(toState);
                }))
            );

            it('should pass state.isPlaying to <ControlPanel/>.props.isPlaying', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const app = createAppInstanceWithMockGame.call(this);
                const isPlaying = true;
                app.setState({isPlaying});

                // when
                const controlPanel = app.find(ControlPanel);

                // then
                expect(controlPanel.prop('isPlaying')).toEqual(isPlaying);
            }));
        });

        describe('TimeTicker', function () {
            it('should have <TimeTicker> only when state.isPlaying is true', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const app = createAppInstanceWithMockGame.call(this);
                expect(app.state('isPlaying')).toEqual(true);
                expect(app.find(TimeTicker).length).toEqual(1);

                // when
                const isPlaying = false;
                app.setState({isPlaying});

                // then
                expect(app.find(TimeTicker).length).toEqual(0);
            }));

            it('pass <TimeTicker onTick={game.proceed}/>', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20;
                const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this, width, height, 'proceed', getIsLiveBefore, getIsLiveAfter);
                app.setState({isPlaying: true});

                assertBoardState(height, width, app.state('board'), getIsLiveBefore);

                // when
                const timeTicker = app.find(TimeTicker);
                let onTick = timeTicker.prop('onTick');
                onTick();

                // then
                assertBoardState(height, width, app.state('board'), getIsLiveAfter);
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
    function createAppInstanceWithMockGame(this: sinon.SinonSandbox, width = 1, height = 1, methodName?, getIsLive = (coor) => false, getIsLiveAfter = ({x, y}) => x === y) {
        let additionalMethods = {
            isLiveAt(coor) {
                return getIsLive(coor);
            }
        };
        if (methodName) {
            additionalMethods[methodName] = () => {
                getIsLive = getIsLiveAfter;
            };
        }

        const mockGame = createMockGame(width, height, additionalMethods);
        this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

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