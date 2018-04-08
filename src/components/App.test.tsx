import * as React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

describe('App', function () {
    it('should have a <Board/> and <ControlPanel/>', () => {
        // given
        // when
        let app = shallow(<App/>);

        // then
        expect(app.find(Board).length).toEqual(1);
        expect(app.find(ControlPanel).length).toEqual(1);
    });

    it('should have state.width=30 and state.height=20 by default', () => {
        // given
        const expectedDefaultWidth = 30, expectedDefaultHeight = 20;

        // when
        let app = shallow(<App/>);

        // then
        expect(app.state('width')).toEqual(expectedDefaultWidth);
        expect(app.state('height')).toEqual(expectedDefaultHeight);
    });
});