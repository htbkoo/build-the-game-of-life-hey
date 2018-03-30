import Cell from './Cell';

describe("Cell", function () {
    [
        true,
        false
    ].forEach(isLive =>
        it(`should expose cell.isLive=${isLive} for new Cell({isLive: ${isLive}})`, function () {
            // given
            const expectedIsLive = false;
            let cell = new Cell({isLive: expectedIsLive});

            // when
            let actualIsLive = cell.isLive();

            // then
            expect(actualIsLive).toEqual(expectedIsLive);
        })
    );
});