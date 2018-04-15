import * as React from 'react';
import {shallow} from 'enzyme';
import {PlaybackControls} from 'react-player-controls';

import ControlPanel from './ControlPanelComponent';

import ControlPanelStyledIconButton from './ControlPanelStyledIconButton';
import {NO_OP} from './utils/common';

describe('ControlPanelComponent', function () {
    describe('react-player-controls', function () {
        it('should pass props.onProceedClick to <PlayerControls/>.onNext', function () {
            // given
            const spyOnProceedClick = jest.fn();
            const controlPanelWrapper = shallow(<ControlPanel onProceedClick={spyOnProceedClick} onResetClick={NO_OP} onRandomizeClick={NO_OP} />);

            // when
            let playbackControlsWrapper = controlPanelWrapper.find(PlaybackControls);
            playbackControlsWrapper.simulate('next');

            // then
            expect(spyOnProceedClick.mock.calls.length).toBe(1);
        });

        it('should pass props.onResetClick to #btn_reset.<ControlPanelStyledIconButton/>.onClick', function () {
            // given
            const spyOnResetClick = jest.fn();
            const controlPanelWrapper = shallow(<ControlPanel onProceedClick={NO_OP} onResetClick={spyOnResetClick} onRandomizeClick={NO_OP}/>);

            // when
            let btnResetWrapper = controlPanelWrapper.find("#btn_reset").find(ControlPanelStyledIconButton);
            btnResetWrapper.simulate('click');

            // then
            expect(spyOnResetClick.mock.calls.length).toBe(1);
        });
    });
});