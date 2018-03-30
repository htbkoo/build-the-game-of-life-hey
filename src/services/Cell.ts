export default class Cell {
    private _isLive: boolean;

    constructor({isLive}: { isLive: boolean }) {
        this._isLive = isLive;
    }

    isLive() {
        return this._isLive;
    }
}