import * as React from 'react';
import {shallow} from 'enzyme';

import Board from './BoardComponent';
import {IsLivesState} from './App';

describe('BoardComponent', function () {
    describe('initialization', function () {
        it('should have a table that has same number of tr as height and same number of td in each row as width when initialized', function () {
            // given
            const width = 20, height = 25,
                isLives: IsLivesState = new Array(height).fill(0).map((_, y) =>
                    new Array(width).fill(0).map((_, x) =>
                        true
                    )
                );
            const board = {width, height, isLives};

            // when
            let wrapper = shallow(<Board board={board}/>);

            // then
            expect(wrapper.find('table').length).toEqual(1);
            let rows = wrapper.find('tr');
            expect(rows.length).toEqual(height);
            rows.forEach(row =>
                expect(row.find('td').length).toEqual(width)
            );
        });
    });
});