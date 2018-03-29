import Cell from './Cell';

describe("Cell", function () {
    it("should expose isLive=false by default", function () {
        // given
        let cell = new Cell();

        // when
        let isLive = cell.isLive();

        // then
        expect(isLive).toEqual(false);
    });

    it("should return true for cell.isLive() after calling cell.born()", function () {
        // given
        let cell = new Cell();

        // when
        cell.born();
        let isLive = cell.isLive();

        // then
        expect(isLive).toEqual(true);
    });

    it("should return false for cell.isLive() after calling cell.born() and then followed by cell.die()", function () {
        // given
        let cell = new Cell();

        // when
        cell.born();
        cell.die();
        let isLive = cell.isLive();

        // then
        expect(isLive).toEqual(false);
    });
});