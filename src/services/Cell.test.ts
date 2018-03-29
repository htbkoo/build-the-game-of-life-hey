import Cell from './Cell';

describe("Cell", function () {
    it("should expose isLive", function () {
        // given
        let cell = new Cell();

        // when
        let isLive = cell.isLive();

        // then
        expect(isLive).toEqual(false);
    });
});