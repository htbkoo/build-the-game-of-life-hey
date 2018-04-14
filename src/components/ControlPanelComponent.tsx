import * as React from 'react';
import Paper from 'material-ui/Paper';
import {PlaybackControls} from 'react-player-controls';

import './ControlPanelComponent.css';
import './css/react-player-controls.css';

const styles = {
    Paper: {
        backgroundColor: 'burlywood'
    }
};

type ControlPanelProps = {
    onProceedClick: () => void
};

// IntelliJ bug - already imported with ES6 import state, still keep on asking to add ES5 style require statement thus suppressing
// noinspection NodeModulesDependencies
const ControlPanel = (props: ControlPanelProps) => (
    <div className="ControlPanel">
        <Paper style={styles.Paper} zDepth={3} rounded={false} className="ControlPanel-Paper">
            <PlaybackControls
                isPlayable={false}
                isPlaying={false}
                onPlaybackChange={() => {
                }}
                showPrevious={false}
                hasPrevious={false}
                onPrevious={() => {
                }}
                showNext={true}
                hasNext={true}
                onNext={props.onProceedClick}
            />
        </Paper>
    </div>
);

export default ControlPanel;
