import * as React from "react";
import {OnCellClick} from "../App";

import './BoardComponent.css';

const BoardCell = ({isLive, onCellClick}: { isLive: boolean, onCellClick: Function }) => {
    let cssClasses = isLive ? "isLive" : "";

    return <div className={cssClasses} onClick={e => onCellClick()}/>;
};

const BoardRow = ({width, isLives, onCellClick}: { width: number, isLives: Array<boolean>, onCellClick: Function }) => {
    let row = new Array(width).fill(0).map((_, x) => (
        <td key={x}>
            <BoardCell isLive={isLives[x]} onCellClick={() => onCellClick(x)}/>
        </td>
    ));
    return (
        <tr>
            {row}
        </tr>
    );
};

const Board = ({width, height, isLives, onCellClick}: { width: number, height: number, isLives: Array<Array<boolean>>, onCellClick: OnCellClick }) => {
    let cells = new Array(height).fill(0).map((_, y) => (
        <BoardRow key={y}
            width={width} isLives={isLives[y]} onCellClick={(x: number) => onCellClick({x, y})}/>)
    );

    return (
        <table>
            <tbody>
            {cells}
            </tbody>
        </table>
    );
};

export default Board;