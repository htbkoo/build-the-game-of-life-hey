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

    function app() {
        return (<App initialDimension={{width: 30, height: 20}}/>);
    }
});