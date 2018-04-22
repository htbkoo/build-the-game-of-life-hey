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
            const controlPanelWrapper = createControlPanel({onProceedClick: spyOnProceedClick});

            // when
            let playbackControlsWrapper = controlPanelWrapper.find(PlaybackControls);
            playbackControlsWrapper.simulate('next');

            // then
            expect(spyOnProceedClick.mock.calls.length).toBe(1);
        });

        it('should pass props.onResetClick to #btn_reset.<ControlPanelStyledIconButton/>.onClick', function () {
            // given
            const spyOnResetClick = jest.fn();
            const controlPanelWrapper = createControlPanel({onResetClick: spyOnResetClick});

            // when
            let btnResetWrapper = controlPanelWrapper.find('#btn_reset').find(ControlPanelStyledIconButton);
            btnResetWrapper.simulate('click');

            // then
            expect(spyOnResetClick.mock.calls.length).toBe(1);
        });

        it('should pass props.onRandomizeClick to #btn_randomize.<ControlPanelStyledIconButton/>.onClick', function () {
            // given
            const spyOnRandomizeClick = jest.fn();
            const controlPanelWrapper = createControlPanel({onRandomizeClick: spyOnRandomizeClick});

            // when
            let btnRandomizeWrapper = controlPanelWrapper.find('#btn_randomize').find(ControlPanelStyledIconButton);
            btnRandomizeWrapper.simulate('click');

            // then
            expect(spyOnRandomizeClick.mock.calls.length).toBe(1);
        });

        it('should pass props.onPlayToggle to <PlaybackControls/>.props.onPlaybackChange', function () {
            // given
            const spyOnPlayToggle = jest.fn();
            const controlPanelWrapper = createControlPanel({onPlayToggle: spyOnPlayToggle});

            // when
            let playbackControls = controlPanelWrapper.find(PlaybackControls);
            playbackControls.simulate('playbackChange');

            // then
            expect(spyOnPlayToggle.mock.calls.length).toBe(1);
        });

        it('should pass props.isPlaying to <PlaybackControls/>.props.isPlaying', function () {
            // given
            const isPlaying = true;
            const controlPanelWrapper = createControlPanel({isPlaying});

            // when
            let playbackControls = controlPanelWrapper.find(PlaybackControls);

            // then
            expect(playbackControls.prop("isPlaying")).toBe(isPlaying);
        });

        it('should display props.numGeneration', function () {
            // given
            const numGeneration = 10;

            // when
            const controlPanelWrapper = createControlPanel({numGeneration});

            // then
            expect(controlPanelWrapper.find('.NumberOfGeneration').text()).toContain(numGeneration);
        });
    });

    function createControlPanel({onProceedClick = NO_OP, onResetClick = NO_OP, onRandomizeClick = NO_OP, onPlayToggle = NO_OP, isPlaying = false, numGeneration = 0}) {
        return shallow(<ControlPanel
            onProceedClick={onProceedClick}
            onResetClick={onResetClick}
            onRandomizeClick={onRandomizeClick}
            onPlayToggle={onPlayToggle}
            isPlaying={isPlaying}
            numGeneration={numGeneration}
        />);
    }
});