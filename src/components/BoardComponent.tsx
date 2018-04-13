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
        let rows = board.isLives.map((isLivesRow, y) => boardRow(isLivesRow, y));
        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }

    function boardRow(isLivesRow, y) {
        let row = isLivesRow.map((_, x) => boardCell(x));
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
