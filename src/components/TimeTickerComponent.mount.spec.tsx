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
        assertOnTick(spyOnTick).hasBeenCalled(0)
            .andAfter(jest.runOnlyPendingTimers).hasBeenCalled(1);
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
            rightBe4Interval = expectedInterval - residualInterval;
        let spyOnTick = jest.fn();

        // when
        let app = mount(<TimeTicker onTick={spyOnTick}/>);

        // then
        assertOnTick(spyOnTick).hasBeenCalled(0)              // 0
            .andAfter(advancingTime(rightBe4Interval)).hasBeenCalled(0) // 499
            .andAfter(advancingTime(residualInterval)).hasBeenCalled(1) // 500
            .andAfter(advancingTime(residualInterval)).hasBeenCalled(1) // 501
            .andAfter(advancingTime(rightBe4Interval)).hasBeenCalled(2) // 1000
            .andAfter(advancingTime(expectedInterval)).hasBeenCalled(3) // 1500
            .andAfter(advancingTime(residualInterval)).hasBeenCalled(3) // 1501
            .andAfter(advancingTime(expectedInterval)).hasBeenCalled(4);// 2001
    });

    function assertOnTick(spy) {
        return {hasBeenCalled};

        function hasBeenCalled(occurrences) {
            expect(spy.mock.calls.length).toEqual(occurrences);
            return {andAfter};
        }

        function andAfter(fn) {
            fn();
            return {hasBeenCalled};
        }
    }

    function advancingTime(timeRightBeforeInterval) {
        return () => jest.advanceTimersByTime(timeRightBeforeInterval);
    }
});