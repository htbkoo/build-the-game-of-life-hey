import * as React from 'react';
import {shallow} from 'enzyme';
import IconButton from 'material-ui/IconButton';

import ControlPanelStyledIconButton from './ControlPanelStyledIconButton';

describe('ControlPanelStyledIconButton', function () {
    describe('onClick', function () {
        it('should pass props.onClick to <IconButton/>.onNext', function () {
            // given
            const spyOnClick = jest.fn();
            const buttonWrapper = shallow(<ControlPanelStyledIconButton onClick={spyOnClick}/>);

            // when
            buttonWrapper.find(IconButton).simulate('click');

            // then
            expect(spyOnClick.mock.calls.length).toBe(1);
        });
    });
});