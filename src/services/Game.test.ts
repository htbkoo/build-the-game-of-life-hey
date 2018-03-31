import Game from './Game';

describe("Game", function () {
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