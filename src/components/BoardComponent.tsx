import * as React from 'react';
import {BoardState} from './App';

import './BoardComponent.css';

type BoardProps = {
    board: BoardState
};

const Board = ({board}: BoardProps) => {
    return (
        <div className="Board">
            {boardTable()}
        </div>
    );

    function boardTable() {
        let rows = new Array(board.height).fill(0).map((_, y) => boardRow(y));
        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }

    function boardRow(y) {
        let row = new Array(board.width).fill(0).map((_, x) => boardCell(x));
        return (
            <tr key={y}>
                {row}
            </tr>
        );
    }

    function boardCell(x) {
        return (
            <td key={x}>
                <div/>
            </td>
        );
    }
};

export default Board;
