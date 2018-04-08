import * as React from 'react';
import './App.css';
import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';

const logo = require('../logo.svg');

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-Header">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                </div>
                <div className="App-Body">
                    <Board/>
                    <ControlPanel/>
                </div>
                <div className="App-Footer">
                </div>
            </div>
        );
    }
}

export default App;
