import BoardCoordinates from './BoardCoordinates';

describe("BoardCoordinates", function () {
    describe("of", function () {
        it("should create BoardCoordinates with factory method", function () {
            // given
            const x = 10, y = 10;

            // when
            const coordinates = BoardCoordinates.of({x, y});

            // then
            expect(coordinates.x).toEqual(x);
            expect(coordinates.y).toEqual(y);
        });
    });

    describe("areSameAs", function () {
        it("should return true if two BoardCoordinates represent the same coordinates", function () {
            // given
            const x = 10, y = 10;

            const anotherCoordinates = BoardCoordinates.of({x, y});
            const coordinates = BoardCoordinates.of({x, y});

            // when
            let areSame = anotherCoordinates.areSameAs({coordinates});

            // then
            expect(areSame).toEqual(true);
        });
    });
});