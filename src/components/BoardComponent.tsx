import * as React from 'react';

type BoardProps = {
    width: number,
    height: number
};

const Board = ({width, height}: BoardProps) => {
    return (
        <div className="Board">
            {boardTable()}
        </div>
    );

    function boardTable() {
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
        return (
            <table>
                {rows}
            </table>
        );
    }
};

export default Board;
