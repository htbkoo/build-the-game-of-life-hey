import BoardCoordinates from './BoardCoordinates';

describe("BoardCoordinates", function () {
    describe("of", function () {
        it("should create BoardCoordinates with factory method", function () {
            // given
            const x=10, y=10;

            // when
            const coordinates = BoardCoordinates.of({x,y});

            // then
            expect(coordinates.x).toEqual(x);
            expect(coordinates.y).toEqual(y);
        });
    });
});