import * as fs from "fs";
import {checkArgument} from "precond";

import Board from "../Board";

const CHAR_LIVE = 'l';

// IntelliJ bug - definitely in use in Board.integration.spec.ts
// noinspection JSUnusedGlobalSymbols
export default {
    buildFromFile(filename: string): Board {
        let str = fs.readFileSync(filename).toString();
        return this.buildFromString(str.split(/[\r\n]+/));
    },
    buildFromString(lines: Array<string>): Board {
        let height = lines.length;
        checkArgument(height > 0, "lines cannot be empty");

        let width = lines[0].length;
        checkArgument(width > 0, "length of first line, which is assumed to be width, cannot be zero");

        let board = new Board({width, height});

        lines.forEach((line, y) =>
            line.split("").forEach((ch, x) => {
                    if (CHAR_LIVE === ch) {
                        board.setLiveAt({isLive: true, x, y});
                    }
                }
            ));
        return board;
    },
};