import * as React from 'react';

type TimeTickerProps = {
    onTick: () => void
};

type TimeTickerState = {
    intervalId: number
};

const INTERVAL = 500;

class TimeTicker extends React.Component<TimeTickerProps, TimeTickerState> {

    constructor(props: TimeTickerProps) {
        super(props);

        // Untested
        this.state = {
            intervalId: undefined
        };
    }

    componentWillMount(): void {
        let intervalId = window.setInterval(this.props.onTick, INTERVAL);
        this.setState({intervalId});
    }

    render() {
        return (
            <div/>
        );
    }
}

export default TimeTicker;
