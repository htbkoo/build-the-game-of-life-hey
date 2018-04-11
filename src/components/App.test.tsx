import * as React from 'react';
import {shallow} from 'enzyme';

import App from './App';

import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

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
        it('should have state.width=30 and state.height=20 by default', () => {
            // given
            const expectedDefaultWidth = 30, expectedDefaultHeight = 20;

            // when
            let app = shallow(<App/>);

            // then
            expect(app.state('width')).toEqual(expectedDefaultWidth);
            expect(app.state('height')).toEqual(expectedDefaultHeight);
        });

        it('should pass state.width and state.height as props to <Board/>', () => {
            // given
            const width = 10, height = 50;
            const app = shallow(<App/>);

            // when
            app.setState({width, height});

            // then
            expect(app.find(Board).prop('width')).toEqual(width);
            expect(app.find(Board).prop('height')).toEqual(height);
        });
    });
});