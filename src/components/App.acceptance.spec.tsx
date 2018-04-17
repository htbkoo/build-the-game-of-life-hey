import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {mount} from 'enzyme';

describe('App (Acceptance)', function () {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(app(), div);
    });

    it('should mounts without crashing', function () {
        mount(app());
    });

    it('should be able to set board dimension by supplying props such that state.board.width=30 and state.board.height=20', () => {
        // given
        const expectedDefaultWidth = 20, expectedDefaultHeight = 30;
        const initialDimension = {width: expectedDefaultWidth, height: expectedDefaultHeight};

        // when
        let app = mount(<App initialDimension={initialDimension}/>);

        // then
        let boardState = app.state('board');
        expect(boardState.width).toEqual(expectedDefaultWidth);
        expect(boardState.height).toEqual(expectedDefaultHeight);
    });

    function app() {
        return (<App initialDimension={{width: 30, height: 20}}/>);
    }
});