export default class Cell {
    private _isLive: boolean = false;

    isLive() {
        return this._isLive;
    }

    born() {
        this._isLive = true;
        return true;
    }
}