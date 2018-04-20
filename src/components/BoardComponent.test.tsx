import * as React from 'react';
import {shallow} from 'enzyme';

import Board from './BoardComponent';
import {IsLivesState} from './App';
import {NO_OP} from './utils/common';

describe('BoardComponent', function () {
    describe('initialization', function () {
        it('should have a table that has same number of tr as height and same number of td in each row as width when initialized', function () {
            // given
            const width = 20, height = 25,
                isLives: IsLivesState = new Array(height).fill(0).map(() =>
                    new Array(width).fill(0).map(() =>
                        true
                    )
                );
            const board = {width, height, isLives};

            // when
            let wrapper = shallowBoard({board});

            // then
            expect(wrapper.find('table').length).toEqual(1);
            let rows = wrapper.find('tr');
            expect(rows.length).toEqual(height);
            rows.forEach(row =>
                expect(row.find('td div').length).toEqual(width)
            );
        });
    });

    describe('isLive', function () {
        it('should have className=isLive on td.div if the cell is Live', function () {
            // given
            const width = 20, height = 25,
                isLives: IsLivesState = new Array(height).fill(0).map((_, y) =>
                    new Array(width).fill(0).map((_, x) =>
                        (x - y) === 1
                    )
                );
            const board = {width, height, isLives};

            // when
            let wrapper = shallowBoard({board});

            // then
            let rows = wrapper.find('tr');
            rows.forEach((row, y) =>
                row.find('td div').forEach((cell, x) =>
                    expect({x, y, isLive: cell.hasClass('isLive')})
                        .toEqual({x, y, isLive: ((x - y) === 1)})
                )
            );
        });
    });

    describe('onCellClick', function () {
        it('should trigger props.onCellClick on td.div.onClick()', function () {
            // given
            const width = 20, height = 25,
                isLives: IsLivesState = new Array(height).fill(0).map(() =>
                    new Array(width).fill(0).map(() =>
                        false
                    )
                );
            const board = {width, height, isLives};
            const spyOnCellClick = jest.fn();
            const wrapper = shallowBoard({board, onCellClick: spyOnCellClick});
            const target = {x: 10, y: 3};

            // when
            const cell = wrapper.find('tr').at(target.y).find('td').at(target.x).find('div');
            cell.simulate('click');

            // then
            expect(spyOnCellClick.mock.calls.length).toEqual(1);
            expect(spyOnCellClick.mock.calls[0][0]).toEqual(target);
        });
    });

    function shallowBoard({board, onCellClick = NO_OP}) {
        return shallow(<Board board={board} onCellClick={onCellClick}/>);
    }
});