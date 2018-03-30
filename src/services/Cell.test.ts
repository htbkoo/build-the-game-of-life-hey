import Cell from './Cell';

describe("Cell", function () {
    it("should expose cell.isLive=false for new Cell({isLive: false})", function () {
        // given
        const expectedIsLive = false;
        let cell = new Cell({isLive: expectedIsLive});

        // when
        let actualIsLive = cell.isLive();

        // then
        expect(actualIsLive).toEqual(expectedIsLive);
    });
});