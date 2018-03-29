export default class Cell {
    private _isLive: boolean = false;

    isLive() {
        return this._isLive;
    }

    born(): void {
        this._isLive = true;
    }

    die() {
        this._isLive = false;
    }
}