import * as React from 'react';
import Paper from 'material-ui/Paper';
import {PlaybackControls} from 'react-player-controls';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import ActionPowerSettingNew from 'material-ui/svg-icons/action/power-settings-new';
import {green500} from 'material-ui/styles/colors';

import ControlPanelStyledIconButton from './ControlPanelStyledIconButton';

import {NO_OP} from './utils/common';

import './css/ControlPanelComponent.css';
import './css/react-player-controls.css';

const INNER_BUTTON_SIZE = 48;

const styles = {
    Paper: {backgroundColor: 'burlywood'},
};

type ControlPanelProps = {
    onProceedClick: () => void,
    onResetClick: () => void,
    onRandomizeClick: () => void,
    onPlayClick: () => void,
};

// IntelliJ bug - already imported with ES6 import state, still keep on asking to add ES5 style require statement thus suppressing
// noinspection NodeModulesDependencies
const ControlPanel = (props: ControlPanelProps) => (
    <div className="ControlPanel">
        <Paper style={styles.Paper} zDepth={3} rounded={false} className="ControlPanel-Paper">

            <div className="ControlPanel-InnerButton-Div" id="btn_randomize">
                <ControlPanelStyledIconButton onClick={props.onRandomizeClick}>
                    <ActionHelp color={green500}/>
                </ControlPanelStyledIconButton>
            </div>

            <div className="ControlPanel-InnerButton-Div" id="btn_reset">
                <ControlPanelStyledIconButton onClick={props.onResetClick}>
                    <ActionPowerSettingNew color={green500}/>
                </ControlPanelStyledIconButton>
            </div>

            <PlaybackControls
                isPlayable={false}
                isPlaying={false}
                onPlaybackChange={NO_OP}
                showPrevious={false}
                hasPrevious={false}
                onPrevious={NO_OP}
                showNext={true}
                hasNext={true}
                onNext={props.onProceedClick}
            />

        </Paper>
    </div>
);

export default ControlPanel;
