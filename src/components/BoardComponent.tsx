import * as React from 'react';
import {BoardState} from './App';

import './css/BoardComponent.css';

type BoardProps = {
    board: BoardState,
    // TODO: refactor coors type
    onCellClick: (coordinates: { x: number, y: number }) => void
};

const CLASS_NAMES = {
    IS_LIVE: 'isLive'
};

const Board = ({board, onCellClick}: BoardProps) => {
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
        let row = isLivesRow.map((isLivesCell, x) => boardCell(isLivesCell, x, y));
        return (
            <tr key={y}>
                {row}
            </tr>
        );
    }

    function boardCell(isLivesCell, x, y) {
        let divClassName = isLivesCell ? CLASS_NAMES.IS_LIVE : '';
        return (
            <td key={x}>
                <div className={divClassName} onClick={() => onCellClick({x, y})}/>
            </td>
        );
    }
};

export default Board;
