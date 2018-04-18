import * as React from 'react';
import {mount} from 'enzyme';

import TimeTicker from './TimeTickerComponent';

import {NO_OP} from './utils/common';

describe('TimeTicker (mount)', function () {
    it('should trigger props.onTick() upon pending timer has run', () => {
        // given
        jest.useFakeTimers();

        const expectedInterval = 500, timeRightBeforeInterval = expectedInterval - 1;
        let spyOnTick = jest.fn();

        // when
        let app = mount(<TimeTicker onTick={spyOnTick}/>);

        // then
        expect(spyOnTick.mock.calls.length).toEqual(0);

        jest.runOnlyPendingTimers();

        expect(spyOnTick.mock.calls.length).toEqual(1);
    });

    it('should have state.intervalId to be defined after ComponentWillMount', () => {
        // given
        jest.useFakeTimers();

        // when
        let app = mount(<TimeTicker onTick={NO_OP}/>);

        // then
        expect(app.state('intervalId')).toBeDefined();
    });

    it('should, when ComponentWillMount, setInterval so that props.onTick() will happen per interval', () => {
        // given
        jest.useFakeTimers();

        const expectedInterval = 500, residualInterval = 1,
            timeRightBeforeInterval = expectedInterval - residualInterval;
        let spyOnTick = jest.fn();

        // when
        let app = mount(<TimeTicker onTick={spyOnTick}/>);

        // then
        expect(spyOnTick.mock.calls.length).toEqual(0);

        jest.advanceTimersByTime(timeRightBeforeInterval);

        expect(spyOnTick.mock.calls.length).toEqual(0);

        jest.advanceTimersByTime(residualInterval);

        expect(spyOnTick.mock.calls.length).toEqual(1);
    });
});