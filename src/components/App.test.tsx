import * as React from 'react';
import {shallow} from 'enzyme';
import {sinonTest} from '../test-utils/sinonWithTest';

import App from './App';

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

        it('should pass state.width and state.height as props to <Board/>', () => {
            // given
            const width = 10, height = 50;
            const app = shallow(<App/>);

            // when
            app.setState({board:{width, height}});

            // then
            expect(app.find(Board).prop('width')).toEqual(width);
            expect(app.find(Board).prop('height')).toEqual(height);
        });

        it('should have a new game and state.board.isLives according to the game state', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            const width = 30, height = 20;
            const mockGame = {
                isLiveAt({x, y}) {
                    return x === y;
                },
                getWidth(){
                    return width;
                },
                getHeight(){
                    return height;
                }
            };
            this.stub(Game, 'new').withArgs({width, height}).returns(mockGame);

            // when
            const app = shallow(<App/>);

            // then
            let boardState = app.state('board');

            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    expect({x, y, isLive: boardState.isLives[y][x]}).toEqual({x, y, isLive: x === y});
                }
            }

            // stateGame.isLives.forEach(row =>
            //     row.forEach(cell =>
            //         expect(cell).toEqual(true))
            // );
        }));
    });
});