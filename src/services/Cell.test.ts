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

    it("should expose isLive=true after calling cell.born()", function () {
        // given
        let cell = new Cell();

        // when
        let canBorn = cell.born();
        let isLive = cell.isLive();

        // then
        expect(canBorn).toEqual(true);
        expect(isLive).toEqual(true);
    });
});