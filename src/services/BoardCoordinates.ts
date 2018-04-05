export default class BoardCoordinates {
    private constructor(public x: number, public y: number) {

    }

    static of({x, y}: { x: number, y: number }): BoardCoordinates {
        return new BoardCoordinates(x, y);
    }
}