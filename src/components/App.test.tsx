import * as React from 'react';
import {shallow} from 'enzyme';
import {sinonTest} from '../test-utils/sinonWithTest';

import App, {BoardState} from './App';

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';
import Game from '../services/Game';

describe('App', function () {
    describe('initialization', function () {
        it('should have a <Board/> and <ControlPanel/>', () => {
            // given
            // when
            let app = shallow(<App/>);

            // then
            expect(app.find(Board).length).toEqual(1);
            expect(app.find(ControlPanel).length).toEqual(1);
        });
    });

    describe('state', function () {
        it('should have state.board.width=30 and state.board.height=20 by default', () => {
            // given
            const expectedDefaultWidth = 30, expectedDefaultHeight = 20;

            // when
            let app = shallow(<App/>);

            // then
            let boardState = app.state('board');
            expect(boardState.width).toEqual(expectedDefaultWidth);
            expect(boardState.height).toEqual(expectedDefaultHeight);
        });

        it('should pass state.board as props to <Board/>', () => {
            // given
            const width = 10, height = 50;
            const boardState = {width, height};
            const app = shallow(<App/>);

            // when
            app.setState({board: {width, height}});

            // then
            expect(app.find(Board).prop('board')).toEqual(boardState);
        });

        it('should have a new game and randomized and state.board.isLives according to the game state', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const width = 30, height = 20;

            // necessary for the signature
            // noinspection JSUnusedLocalSymbols
            let getIsLive = (coor) => false;
            const mockGame = {
                isLiveAt(coor) {
                    return getIsLive(coor);
                },
                getWidth() {
                    return width;
                },
                getHeight() {
                    return height;
                },
                randomize: () => {
                    getIsLive = ({x, y}) => x === y;
                }
            };
            this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

            // when
            const app = shallow(<App/>);

            // then
            let boardState = app.state('board');
            assertBoardState(height, width, boardState, ({x, y}) => x === y);
        }));
    });

    describe('onProceedClick', function () {
        it('should call game.proceed() and set to next state when <ControlPanelComponent/>.props.onProceedClick()', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const width = 30, height = 20;
            // necessary for the signature
            // noinspection JSUnusedLocalSymbols
            let getIsLive = (_) => false;
            const mockGame = {
                isLiveAt(coor) {
                    return getIsLive(coor);
                },
                getWidth() {
                    return width;
                },
                getHeight() {
                    return height;
                },
                randomize: () => {
                },
                proceed: () => {
                    getIsLive = ({x, y}) => x === y;
                }
            };
            this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

            const app = shallow(<App/>);

            assertBoardState(height, width, app.state('board'), () => false);

            // when
            const controlPanel = app.find(ControlPanel);
            let onProceedClick = controlPanel.prop('onProceedClick');
            onProceedClick();

            // then
            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    expect({x, y, isLive: app.state('board').isLives[y][x]}).toEqual({x, y, isLive: x === y});
                }
            }
        }));
    });

    function assertBoardState(height: number, width: number, boardState: BoardState, getExpectedIsLive: (coor) => boolean) {
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                expect({x, y, isLive: boardState.isLives[y][x]}).toEqual({x, y, isLive: getExpectedIsLive({x, y})});
            }
        }
    }
});