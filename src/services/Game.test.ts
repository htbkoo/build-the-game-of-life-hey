import Game from './Game';

describe("Game", function () {
    describe("constructor", function () {
        it("should take {width, height} and create Board accordingly", function () {
            // given
            const width = 20, height = 30;

            // when
            let game = new Game({width, height});

            // then
            expect(game["_board"].getWidth()).toEqual(width);
            expect(game["_board"].getHeight()).toEqual(height);
        });
    });

    describe("isLiveAt", function () {
        // given
        const width = 20, height = 30;

        // when
        let game = new Game({width, height});

        // then
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                expect(game.isLiveAt({x, y})).toEqual(false);
            }
        }
    });

    describe("toggleLiveAt", function () {
        // given
        const width = 20, height = 30, x = 5, y = 7;
        let game = new Game({width, height});
        expect(game.isLiveAt({x, y})).toEqual(false);

        // when
        let isLiveAfterToggle = game.toggleLiveAt({x, y});

        // then
        const expectedIsLiveAfterToggle = true;
        expect(isLiveAfterToggle).toEqual(expectedIsLiveAfterToggle);
        expect(game.isLiveAt({x, y})).toEqual(expectedIsLiveAfterToggle);

    });
});