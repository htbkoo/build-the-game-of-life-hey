import * as fs from "fs";
import {checkArgument} from "precond";

import Board, {Cells} from "../Board";
import Cell from "../Cell";

const CHAR_LIVE = 'l';

// IntelliJ bug - definitely in use in Board.integration.spec.ts
// noinspection JSUnusedGlobalSymbols
export default {
    readFileToLines(filename: string): Array<string> {
        let str = fs.readFileSync(filename).toString();
        return str.split(/[\r\n]+/);
    },
    buildFromFile(filename: string): Board {
        return this.buildFromLines(this.readFileToLines(filename));
    },
    buildFromLines(lines: Array<string>): Board {
        let height = lines.length;
        checkArgument(height > 0, "lines cannot be empty");

        let width = lines[0].length;
        checkArgument(width > 0, "length of first line, which is assumed to be width, cannot be zero");

        let cells: Cells = lines.map((line) =>
            line.split("").map((ch) =>
                Cell.of({isLive: CHAR_LIVE === ch})
            ));

        return Board.newFromCells({cells});
    },
};