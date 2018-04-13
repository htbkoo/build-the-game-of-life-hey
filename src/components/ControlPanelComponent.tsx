import * as React from 'react';
import Paper from 'material-ui/Paper';

import './ControlPanelComponent.css';

const styles = {
    Paper: {
        backgroundColor: 'burlywood'
    }
};

const ControlPanel = () => (
    <div className="ControlPanel">
        <Paper style={styles.Paper} zDepth={3} rounded={false} className="ControlPanel-Paper"/>
    </div>
);

export default ControlPanel;
