import * as React from 'react';
import './App.css';
import Board from './BoardComponent';
import ControlPanel from './ControlPanelComponent';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-Header">
                    <AppBar title="Hey's Game of Life (ReactJs + TypeScript)" className="App-Header-AppBar" />
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
