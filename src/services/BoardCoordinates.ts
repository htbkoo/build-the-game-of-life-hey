export default class BoardCoordinates {
    private constructor(public readonly x: number, public readonly y: number) {
    }

    static of({x, y}: { x: number, y: number }): BoardCoordinates {
        return new BoardCoordinates(x, y);
    }

    areSameAs({coordinates}: { coordinates: BoardCoordinates }): boolean {
        return this.x === coordinates.x && this.y === coordinates.y;
    }
}