import * as React from 'react';
import Paper from 'material-ui/Paper';
import {PlaybackControls} from 'react-player-controls';
import IconButton from 'material-ui/IconButton';

const INNER_BUTTON_SIZE = 48;

const styles = {
    InnerButtonPaper: {
        backgroundColor: 'white',
        maxHeight: INNER_BUTTON_SIZE,
        maxWidth: INNER_BUTTON_SIZE
    },
    mediumIcon: {
        width: INNER_BUTTON_SIZE,
        height: INNER_BUTTON_SIZE,
    },
    medium: {
        width: INNER_BUTTON_SIZE,
        height: INNER_BUTTON_SIZE,
        padding: 0,
    },
};

type ControlPanelStyledIconButtonProps = {
    children?: any,
    onClick: (event: object) => void
};

const ControlPanelStyledIconButton = (props: ControlPanelStyledIconButtonProps) => (
    <div className="StyledButton">
        <Paper style={styles.InnerButtonPaper} zDepth={0} circle={true}>
            <IconButton
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={props.onClick}
            >
                {props.children}
            </IconButton>
        </Paper>
    </div>
);

export default ControlPanelStyledIconButton;
