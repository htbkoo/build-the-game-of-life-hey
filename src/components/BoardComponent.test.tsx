import * as React from 'react';
import {shallow} from 'enzyme';

import Board from './BoardComponent';

describe('BoardComponent', function () {
    describe('initialization', function () {
        it('should have a table that has same number of tr as height and same number of td in each row as width when initialized', function () {
            // given
            const width = 20, height = 20;

            // when
            let wrapper = shallow(<Board width={width} height={height}/>);

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