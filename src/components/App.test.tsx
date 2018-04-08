import * as React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

describe('App', function () {
    it('should have a <Board/> and <ControlPanel/>', () => {
        // given
        // when
        let wrapper = shallow(<App/>);

        // then
        expect(wrapper.find(Board).length).toEqual(1);
        expect(wrapper.find(ControlPanel).length).toEqual(1);
    });
});