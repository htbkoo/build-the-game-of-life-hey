export default class Cell {
    static readonly LIVE: Cell = new Cell({isLive: true});
    static readonly DEAD: Cell = new Cell({isLive: false});

    private readonly _isLive: boolean;

    private constructor({isLive}: { isLive: boolean }) {
        this._isLive = isLive;
    }

    static of({isLive}: { isLive: boolean }): Cell {
        return isLive ? Cell.LIVE : Cell.DEAD;
    }

    isLive() {
        return this._isLive;
    }
}