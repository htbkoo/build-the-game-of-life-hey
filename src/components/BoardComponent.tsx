import * as React from 'react';

type BoardProps = {
    width: number,
    height: number
};

const Board = ({width, height}: BoardProps) => {
    let rows = new Array(height).fill(0).map((_, y) => {
        let row = new Array(width).fill(0).map((__, x) => {
            return <td key={x}/>;
        });
        return (
            <tr key={y}>
                {row}
            </tr>
        );
    });
    return (<div className="Board">
        <table>
            {rows}
        </table>
    </div>);
};

export default Board;
