import Game from './Game';
import BoardCoordinates from "./BoardCoordinates";

describe("Game (integration)", function () {
    describe("toggleLiveAt", function () {
        it("should be able to toggle isLive by toggleLiveAt", function () {
            // given
            const width = 20, height = 30, x = 5, y = 7;
            let game = new Game({width, height});
            expect(game.isLiveAt(BoardCoordinates.of({x, y}))).toEqual(false);

            // when
            let isLiveAfterToggle = game.toggleLiveAt(BoardCoordinates.of({x, y}));

            // then
            const expectedIsLiveAfterToggle = true;
            expect(isLiveAfterToggle).toEqual(expectedIsLiveAfterToggle);
            expect(game.isLiveAt(BoardCoordinates.of({x, y}))).toEqual(expectedIsLiveAfterToggle);
        });
    });

    describe("reset", function () {
        it("should set isLive=false for all cells after game.reset()", function () {
            // given
            const width = 20, height = 30;
            let game = new Game({width, height});


            game.toggleLiveAt(BoardCoordinates.of({x: 0, y: 0}));
            game.toggleLiveAt(BoardCoordinates.of({x: 1, y: 2}));
            game.toggleLiveAt(BoardCoordinates.of({x: 2, y: 2}));

            // when
            game.reset();

            // then
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    expect(game.isLiveAt(BoardCoordinates.of({x, y}))).toEqual(false);
                }
            }
        });
    });
});