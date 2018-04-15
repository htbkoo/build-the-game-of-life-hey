import * as React from 'react';
import {shallow} from 'enzyme';
import {PlaybackControls} from 'react-player-controls';

import ControlPanel from './ControlPanelComponent';

describe('ControlPanelComponent', function () {
    describe('react-player-controls', function () {
        it('should pass props.onProceedClick to <PlayerControls/>.onNext', function () {
            // given
            const spyOnProceedClick = jest.fn();
            const controlPanelWrapper = shallow(<ControlPanel onProceedClick={spyOnProceedClick} onResetClick={()=>{}} />);

            // when
            let playbackControlsWrapper = controlPanelWrapper.find(PlaybackControls);
            playbackControlsWrapper.simulate('next');

            // then
            expect(spyOnProceedClick.mock.calls.length).toBe(1);
        });
    });
});