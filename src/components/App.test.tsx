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
            const methodName = 'randomize';
            const getIsLive = () => false, getIsLiveAfter = ({x, y}) => x === y;

            // when
            const app = createAppInstanceWithMockGame.call(this,
                {width, height, methodName, getIsLive, getIsLiveAfter});

            // then
            assertBoardState(height, width, app.state('board'), getIsLiveAfter);
        }));
    });

    describe('handlers', function () {
        describe('onProceedClick', function () {
            it('should call game.proceed() and set to next state when <ControlPanelComponent/>.props.onProceedClick()', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20;
                const methodName = 'proceed';
                const getIsLive = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this,
                    {width, height, methodName, getIsLive, getIsLiveAfter});

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
                const methodName = 'reset';
                const getIsLive = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this,
                    {width, height, methodName, getIsLive, getIsLiveAfter});

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

                let initialized = false;
                // necessary for the signature
                // noinspection JSUnusedLocalSymbols
                let getIsLive = (coors) => false;
                const randomize = () => {
                    if (initialized) {
                        getIsLive = ({x, y}) => x === y;
                    }
                };
                const mockGame = createMockGame(width, height, {
                    isLiveAt(coors) {
                        return getIsLive(coors);
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

            [
                true,
                false
            ].forEach(isPlaying =>
                it(`should pass state.isPlaying=${isPlaying} to <ControlPanel/>.props.isPlaying`, sinonTest(function (this: sinon.SinonSandbox) {
                    // given
                    const app = createAppInstanceWithMockGame.call(this);
                    app.setState({isPlaying});

                    // when
                    const controlPanel = app.find(ControlPanel);

                    // then
                    expect(controlPanel.prop('isPlaying')).toEqual(isPlaying);
                }))
            );
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
                const methodName = 'proceed';
                const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this,
                    {width, height, methodName, getIsLiveBefore, getIsLiveAfter});

                // when
                const timeTicker = app.find(TimeTicker);
                let onTick = timeTicker.prop('onTick');
                onTick();

                // then
                assertBoardState(height, width, app.state('board'), getIsLiveAfter);
            }));
        });

        describe('toggleCell', function () {
            it('should have <TimeTicker> only when state.isPlaying is true', sinonTest(function (this: sinon.SinonSandbox) {
                // given
                const width = 30, height = 20, coors = {x: 2, y: 3};
                const methodName = 'toggleLiveAt', expectedArgs = [coors];
                const getIsLiveBefore = () => false, getIsLiveAfter = ({x, y}) => x === y;

                const app = createAppInstanceWithMockGame.call(this,
                    {width, height, methodName, getIsLiveBefore, getIsLiveAfter, expectedArgs});

                // when
                const board = app.find(Board);
                let onCellClick = board.prop('onCellClick');
                onCellClick(coors);

                // then
                assertBoardState(height, width, app.state('board'), getIsLiveAfter);
            }));
        });

        //    TODO: add generation count
    });

    function shallowApp(initialDimension = {width: 30, height: 20}) {
        return shallow(<App initialDimension={initialDimension}/>);
    }

    function withDimension(width: number, height: number) {
        return {width, height};
    }

    // necessary for the signature
    // noinspection JSUnusedLocalSymbols
    const APP_INSTANCE_DEFAULT_PARAMS = {
        width: 1,
        height: 1,
        methodName: undefined,
        expectedArgs: [],
        getIsLive: (coors) => false,
        getIsLiveAfter: ({x, y}) => x === y
    };

    // necessary for the signature
    // noinspection JSUnusedLocalSymbols
    function createAppInstanceWithMockGame(this: sinon.SinonSandbox,
                                           {width = 1, height = 1, methodName = undefined, expectedArgs = [], getIsLive = (coors) => false, getIsLiveAfter = ({x, y}) => x === y}
                                               = APP_INSTANCE_DEFAULT_PARAMS
    ) {
        let additionalMethods = {
            isLiveAt(coors) {
                return getIsLive(coors);
            }
        };
        if (methodName) {
            // Unfortunately, chained sinon stub does not work and the withArgs() is simply ignored
            // maybe related reference: https://github.com/sinonjs/sinon/issues/176
            let stub = this.stub();
            if (expectedArgs.length > 0) {
                stub.withArgs(...expectedArgs).callsFake(() => getIsLive = getIsLiveAfter);
            } else {
                stub.callsFake(() => getIsLive = getIsLiveAfter);
            }
            additionalMethods[methodName] = stub;
        }

        const mockGame = createMockGame(width, height, additionalMethods);
        this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

        const app = shallowApp(withDimension(width, height));
        assertBoardState(height, width, app.state('board'), getIsLive);

        return app;
    }

    function assertBoardState(height: number, width: number, boardState: BoardState, getExpectedIsLive: (coors) => boolean) {
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